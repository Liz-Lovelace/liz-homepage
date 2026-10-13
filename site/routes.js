// Which page a path shows. Shared by the server (status codes, meta tags) and the
// browser router (which links it can handle without a reload).

import { photoGroups, photos } from './data.js';
import { posts } from './posts/index.js';

const hiddenGroups = new Set(photoGroups.filter((g) => g.hidden).map((g) => g.id));

export function matchRoute(pathname) {
  if (pathname === '/') return { name: 'home' };
  if (pathname === '/gallery') return { name: 'gallery' };
  if (pathname === '/gallery/nudes') return { name: 'gallery', hidden: true };
  let m = pathname.match(/^\/gallery\/([a-z0-9-]+)$/);
  const photo = m && photos.find((p) => p.id === m[1]);
  if (photo) return { name: 'gallery', photo: photo.id, hidden: hiddenGroups.has(photo.group) };
  m = pathname.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m && posts[m[1]]) return { name: 'post', slug: m[1] };
  return { name: 'notfound' };
}
