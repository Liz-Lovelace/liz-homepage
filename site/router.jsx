// A small client-side router. Pages are plain <a href> links: on the server they're
// ordinary links, and in the browser a click on a link to one of our pages swaps the
// page in place (no reload, no loading screen) while the URL bar, Back/Forward and
// scroll positions behave like a classic multi-page site.

import { createContext, useContext, useEffect, useLayoutEffect, useSyncExternalStore } from 'react';
import { matchRoute } from './routes.js';

const UrlContext = createContext('/');

const listeners = new Set();
const subscribe = (fn) => (listeners.add(fn), () => listeners.delete(fn));
const notify = () => listeners.forEach((fn) => fn());
const currentUrl = () => location.pathname + location.search;

// What to do with the scroll position after the next render.
let pendingScroll = null;

function saveScroll() {
  history.replaceState({ ...history.state, scrollY: window.scrollY }, '');
}

// `scroll: false` keeps the scroll position (used when opening a photo over the gallery).
export function navigate(to, { replace = false, scroll = true, state = {} } = {}) {
  saveScroll();
  const url = new URL(to, location.href);
  const entry = { ...state, scrollY: 0 };
  if (replace) history.replaceState(entry, '', url);
  else history.pushState(entry, '', url);
  pendingScroll = scroll ? { hash: url.hash } : null;
  notify();
}

export function useUrl() {
  return useContext(UrlContext);
}

export function Router({ url, children }) {
  // On the server `url` is the request URL; in the browser it follows history.
  const live = useSyncExternalStore(subscribe, currentUrl, () => url);
  return <UrlContext.Provider value={live}>{children}</UrlContext.Provider>;
}

// Client-only behaviour: intercept link clicks, handle Back/Forward, restore scroll.
export function useBrowserRouting() {
  const url = useUrl();

  useEffect(() => {
    history.scrollRestoration = 'manual';
    let shown = currentUrl();

    // A reload or a return from another site: put the page back where it was.
    if (history.state?.scrollY) window.scrollTo(0, history.state.scrollY);

    function onClick(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const next = new URL(a.href, location.href);
      if (next.origin !== location.origin) return;
      // Same page, only the #fragment differs: the browser already does the right thing.
      if (next.pathname + next.search === currentUrl() && next.hash) return;
      // Files like /feed.xml aren't pages: let the browser load them.
      if (matchRoute(next.pathname).name === 'notfound') return;
      e.preventDefault();
      navigate(next.pathname + next.search + next.hash, { scroll: a.dataset.keepScroll === undefined });
    }

    function onPopState() {
      const now = currentUrl();
      if (now === shown) return; // a #fragment change on the same page
      pendingScroll = { restore: history.state?.scrollY ?? 0 };
      notify();
    }

    const sync = () => (shown = currentUrl());
    const unsub = subscribe(sync);
    window.addEventListener('pagehide', saveScroll);
    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPopState);
    return () => {
      unsub();
      window.removeEventListener('pagehide', saveScroll);
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useLayoutEffect(() => {
    const s = pendingScroll;
    pendingScroll = null;
    if (!s) return;
    if (s.restore !== undefined) window.scrollTo(0, s.restore);
    else if (s.hash) document.getElementById(decodeURIComponent(s.hash.slice(1)))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [url]);
}
