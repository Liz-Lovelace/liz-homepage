import { useEffect, useRef } from 'react';
import { photoGroups, photos } from '../data.js';
import { navigate } from '../router.jsx';
import Img, { ratio } from '../components/Img.jsx';
import Viewer from '../components/Viewer.jsx';

// /gallery shows the listed groups. /gallery/nudes is the same page for the hidden
// group (kept so the old site's links still work). /gallery/<photo> is either one,
// with that photo open in the viewer.
export default function Gallery({ photo: photoId, hidden }) {
  const groups = photoGroups.filter((g) => !!g.hidden === !!hidden);
  const list = groups.flatMap((g) => photos.filter((p) => p.group === g.id));
  const index = list.findIndex((p) => p.id === photoId);
  const home = hidden ? '/gallery/nudes' : '/gallery';
  const hrefFor = (p) => `/gallery/${p.id}`;

  // When the viewer closes, return keyboard focus to the photo it showed.
  const lastOpen = useRef(null);
  useEffect(() => {
    if (photoId) lastOpen.current = photoId;
    else if (lastOpen.current) {
      document.querySelector(`[data-photo="${lastOpen.current}"]`)?.focus({ preventScroll: true });
      lastOpen.current = null;
    }
  }, [photoId]);

  function open(e, p) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(hrefFor(p), { scroll: false, state: { fromGallery: true } });
  }

  function go(i) {
    navigate(hrefFor(list[i]), { replace: true, scroll: false, state: { fromGallery: history.state?.fromGallery } });
  }

  function close() {
    // Opened from the grid: just go back. Arrived by link: swap in the gallery and show where the photo is.
    if (history.state?.fromGallery) return history.back();
    const id = photoId;
    navigate(home, { replace: true, scroll: false });
    requestAnimationFrame(() => document.querySelector(`[data-photo="${id}"]`)?.scrollIntoView({ block: 'center' }));
  }

  return (
    <main className="page wide gallery">
      <p className="back"><a href="/">Liz Lovelace</a></p>
      <h1>{hidden ? 'Nudes' : 'Pictures'}</h1>
      {hidden && <p className="lede">Content warning: nudity. These were in the gallery of the old version of this site.</p>}

      {groups.map((g) => (
        <section key={g.id} aria-labelledby={hidden ? undefined : g.id} aria-label={hidden ? g.title : undefined}>
          {!hidden && <h2 id={g.id}>{g.title}</h2>}
          <ul className="justified">
            {photos.filter((p) => p.group === g.id).map((p) => (
              <li key={p.id} style={{ '--ratio': ratio(p.id).toFixed(4) }}>
                <a href={hrefFor(p)} data-photo={p.id} onClick={(e) => open(e, p)}>
                  <Img id={p.id} alt={p.alt} sizes={`(max-width: 600px) ${Math.round(190 * ratio(p.id))}px, ${Math.round(330 * ratio(p.id))}px`} />
                </a>
              </li>
            ))}
            <li className="justified-end" aria-hidden="true" />
          </ul>
        </section>
      ))}

      {index >= 0 && (
        <Viewer list={list} index={index} hrefFor={hrefFor} closeHref={home} onGo={go} onClose={close} />
      )}
    </main>
  );
}
