// "What's new since your last visit", remembered in the visitor's own browser.
//
// localStorage keeps one record: the newest update the visitor has had a chance to
// see, and when. A visit only counts once someone has spent a little while on the
// site (VISIT_SECONDS of the page actually being on screen), so a two-second bounce
// doesn't hide new things from them next time.
//
// The previous record is read once per browser session and kept in sessionStorage,
// so the "new" marks stay put while the visitor clicks around, and only reset on
// their next visit.

const KEY = 'liz:last-visit';
const SESSION_KEY = 'liz:previous-visit';
const SECONDS_KEY = 'liz:seconds-here';
const VISIT_SECONDS = 20;

const read = (storage, key) => {
  try { return storage.getItem(key); } catch { return null; }
};
const write = (storage, key, value) => {
  try { storage.setItem(key, value); } catch { /* private mode, blocked storage: no memory, no harm */ }
};

// { seen: 'YYYY-MM-DD', at: ISO time } of the visit before this one, or null for a first visit.
// ?last-visit=2026-05-01 pretends, for trying the feature out.
export function previousVisit() {
  const pretend = new URLSearchParams(location.search).get('last-visit');
  if (pretend && /^\d{4}-\d{2}-\d{2}$/.test(pretend)) return { seen: pretend, at: pretend };

  let value = read(sessionStorage, SESSION_KEY);
  if (value === null) {
    value = read(localStorage, KEY) ?? 'none';
    write(sessionStorage, SESSION_KEY, value);
  }
  if (value === 'none') return null;
  try { return JSON.parse(value); } catch { return null; }
}

// Counts on-screen time across the whole session and records the visit once it's long enough.
export function trackVisit(newest) {
  let seconds = Number(read(sessionStorage, SECONDS_KEY)) || 0;
  const timer = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    seconds += 1;
    write(sessionStorage, SECONDS_KEY, String(seconds));
    if (seconds >= VISIT_SECONDS) {
      write(localStorage, KEY, JSON.stringify({ seen: newest, at: new Date().toISOString() }));
      clearInterval(timer);
    }
  }, 1000);
  return () => clearInterval(timer);
}
