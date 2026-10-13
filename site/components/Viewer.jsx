import { useEffect, useLayoutEffect, useRef } from 'react';
import Img, { ratio, smallest } from './Img.jsx';

// Full-screen photo viewer. It's a real page (/gallery/<photo>), so it works without
// JavaScript and as a shared link: Previous, Next and Close are ordinary links.
// In the browser it also does keyboard (arrows, Esc), swipe left/right, swipe down
// to close, and tapping the photo to hide everything but the photo.
export default function Viewer({ list, index, hrefFor, closeHref, onGo, onClose }) {
  const root = useRef(null);
  const track = useRef(null);
  const photo = list[index];
  const prev = list[index - 1];
  const next = list[index + 1];

  // Latest props for the long-lived event handlers below.
  const live = useRef();
  live.current = { index, count: list.length, onGo, onClose };

  // Lock page scroll while open; put focus inside the dialog.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('viewer-open');
    root.current.focus({ preventScroll: true });
    return () => html.classList.remove('viewer-open');
  }, []);

  // A new photo starts centred, without animation.
  useLayoutEffect(() => {
    const t = track.current;
    t.classList.remove('animate');
    t.style.transform = '';
    root.current.style.backgroundColor = '';
  }, [index]);

  useEffect(() => {
    const el = root.current;
    const t = track.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function go(step) {
      const { index, count, onGo } = live.current;
      const to = index + step;
      if (to < 0 || to >= count) return snapBack();
      if (reduced) return onGo(to);
      t.classList.add('animate');
      t.style.transform = `translateX(${-step * 100}%)`;
      const done = () => {
        t.removeEventListener('transitionend', done);
        onGo(to);
      };
      t.addEventListener('transitionend', done);
    }

    function snapBack() {
      t.classList.add('animate');
      t.style.transform = '';
      el.style.backgroundColor = '';
    }

    function onKey(e) {
      if (e.key === 'Escape') live.current.onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Tab') {
        // Keep keyboard focus inside the viewer.
        const items = [...el.querySelectorAll('a[href], button')].filter((x) => x.offsetParent);
        const first = items[0];
        const last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    // Swipe: sideways = previous/next, down = close, a tap = toggle the plain view.
    let drag = null;
    function down(e) {
      if (e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, t: performance.now(), axis: null, id: e.pointerId };
      t.setPointerCapture(e.pointerId);
      t.classList.remove('animate');
    }
    function move(e) {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.axis && Math.hypot(dx, dy) > 8) drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      const { index, count } = live.current;
      if (drag.axis === 'x') {
        const edge = (index === 0 && dx > 0) || (index === count - 1 && dx < 0);
        t.style.transform = `translateX(${edge ? dx / 3 : dx}px)`;
      } else if (drag.axis === 'y' && dy > 0) {
        t.style.transform = `translateY(${dy}px) scale(${1 - Math.min(dy / 2000, 0.15)})`;
        el.style.backgroundColor = `rgb(var(--viewer-bg) / ${1 - Math.min(dy / 400, 0.8)})`;
      }
    }
    function up(e) {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      const quick = performance.now() - drag.t < 250;
      const axis = drag.axis;
      drag = null;
      if (!axis) return el.classList.toggle('plain');
      if (axis === 'x') {
        const w = t.clientWidth;
        if (dx < -w * 0.2 || (quick && dx < -40)) go(1);
        else if (dx > w * 0.2 || (quick && dx > 40)) go(-1);
        else snapBack();
      } else if (dy > 120 || (quick && dy > 50)) live.current.onClose();
      else snapBack();
    }
    function cancel() {
      drag = null;
      snapBack();
    }

    document.addEventListener('keydown', onKey);
    t.addEventListener('pointerdown', down);
    t.addEventListener('pointermove', move);
    t.addEventListener('pointerup', up);
    t.addEventListener('pointercancel', cancel);
    root.current.goStep = go;
    return () => {
      document.removeEventListener('keydown', onKey);
      t.removeEventListener('pointerdown', down);
      t.removeEventListener('pointermove', move);
      t.removeEventListener('pointerup', up);
      t.removeEventListener('pointercancel', cancel);
    };
  }, []);

  const click = (step) => (e) => {
    e.preventDefault();
    root.current.goStep(step);
  };

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label="Photo" tabIndex={-1} ref={root}>
      <div className="viewer-track" ref={track}>
        <Slide key={prev?.id ?? 'start'} photo={prev} />
        <Slide key={photo.id} photo={photo} current />
        <Slide key={next?.id ?? 'end'} photo={next} />
      </div>
      <p className="viewer-count">{index + 1} of {list.length}</p>
      <a className="viewer-close" href={closeHref} onClick={(e) => { e.preventDefault(); onClose(); }} aria-label="Close">
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </a>
      {prev && (
        <a className="viewer-prev" href={hrefFor(prev)} onClick={click(-1)} aria-label="Previous photo">
          <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </a>
      )}
      {next && (
        <a className="viewer-next" href={hrefFor(next)} onClick={click(1)} aria-label="Next photo">
          <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </a>
      )}
      {photo.caption && <p className="viewer-caption">{photo.caption}</p>}
    </div>
  );
}

// The small thumbnail (usually already cached) shows at once; the sharp version,
// picked by srcset for this screen, fades in over it when it arrives.
function Slide({ photo, current }) {
  if (!photo) return <div className="slide" />;
  return (
    <figure className="slide" aria-hidden={current ? undefined : true}>
      <span className="slide-frame" style={{ '--ratio': ratio(photo.id) }}>
        <img className="slide-preview" src={smallest(photo.id)} alt="" draggable="false" />
        <Img
          id={photo.id}
          alt={photo.alt}
          sizes="100vw"
          eager={current}
          loading="eager"
          draggable="false"
          className="slide-full"
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
          ref={(img) => img?.complete && img.naturalWidth && img.classList.add('loaded')}
        />
      </span>
    </figure>
  );
}
