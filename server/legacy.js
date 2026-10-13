// Old URLs keep working forever. Every URL this site has ever published either still
// shows the same thing, or redirects to where that thing lives now. When you move or
// remove something, add it here (and to scripts/check-links.mjs).
//
// Files the old SvelteKit site served (images, buttons, fonts, /gallery/*.jpg, ...)
// are still served from old-site/static, see main.js.

const GALLERY_TABS = {
  face: '/gallery',
  avatar: '/gallery#avatars',
  other: '/gallery#other',
  porn: '/gallery/nudes',
};

export function legacyRedirects(req, res, next) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();

  // Old blog index: the essays are a section of the home page now.
  if (req.path === '/blog') return res.redirect(301, '/#essays');

  // Old gallery tabs: /gallery?t=face|avatar|other|porn
  if (req.path === '/gallery' && typeof req.query.t === 'string') {
    return res.redirect(301, GALLERY_TABS[req.query.t] ?? '/gallery');
  }

  next();
}
