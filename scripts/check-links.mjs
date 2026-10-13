// Checks that every URL this site has ever published still works: each one must
// answer 200, directly or after redirects. Run it against a running server before
// shipping:
//
//   node scripts/check-links.mjs                      (http://127.0.0.1:3000)
//   node scripts/check-links.mjs http://127.0.0.1:4747
//
// When you publish a new URL, add it to PAGES below. Never remove one: if a page
// goes away, make its URL redirect somewhere sensible instead (server/legacy.js).

import fs from 'node:fs';
import path from 'node:path';
import { photos } from '../site/data.js';

const base = process.argv[2] ?? 'http://127.0.0.1:3000';
const root = path.resolve(import.meta.dirname, '..');

const PAGES = [
  // The old SvelteKit site (2023–2026)
  '/',
  '/blog',
  '/blog/',
  '/blog/factorio',
  '/blog/factorio/',
  '/blog/robust-trust',
  '/blog/robust-trust/',
  '/gallery',
  '/gallery/',
  '/gallery?t=face',
  '/gallery?t=avatar',
  '/gallery?t=other',
  '/gallery?t=porn',

  // The redesign (October 2026)
  '/gallery/nudes',
  ...photos.map((p) => `/gallery/${p.id}`),
  '/feed.xml',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/og.png',
  '/favicon.svg',
  '/favicon-32.png',
  '/apple-touch-icon.png',
];

// Every file the old site served from its static folder, at the same path.
function files(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(path.join(dir, e.name), `${prefix}/${e.name}`) : [`${prefix}/${e.name}`]
  );
}
const OLD_FILES = files(path.join(root, 'old-site/static')).map((f) => f.split('/').map(encodeURIComponent).join('/'));

let failed = 0;
for (const url of [...PAGES, ...OLD_FILES]) {
  const res = await fetch(base + url, { redirect: 'follow' }).catch((e) => ({ status: e.message, url: '' }));
  const where = res.url && res.url !== base + url ? ` -> ${res.url.slice(base.length)}` : '';
  if (res.status !== 200) {
    failed++;
    console.log(`FAIL ${res.status} ${url}${where}`);
  } else if (process.env.VERBOSE) {
    console.log(`ok   ${url}${where}`);
  }
}
console.log(`${PAGES.length + OLD_FILES.length - failed} of ${PAGES.length + OLD_FILES.length} URLs work`);
process.exit(failed ? 1 : 0);
