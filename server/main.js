// The web server. In production it serves the built site (dist/) and renders every
// page on the server, so the HTML that arrives already has all the content in it
// (good for link previews, search engines, AI agents, and people without JS); the
// browser then takes over and handles links in place.
//
//   node server/main.js          production (after `npm run build`)
//   node server/main.js --dev    development, with Vite and hot reload

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import express from 'express';
import compression from 'compression';
import { legacyRedirects } from './legacy.js';

const root = path.resolve(import.meta.dirname, '..');
const dev = process.argv.includes('--dev');
const PORT = Number(process.env.PORT) || 3000;
// In Docker 0.0.0.0 is needed for the port mapping; outside Docker, set BIND_HOST=127.0.0.1.
const HOST = process.env.BIND_HOST || '0.0.0.0';

const app = express();
app.disable('x-powered-by');
app.use(compression());

app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  if (!dev) {
    res.set(
      'Content-Security-Policy',
      "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; " +
        "connect-src 'self' https://report.liz-lovelace.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
    );
  }
  next();
});

// One spelling per page: /gallery/ -> /gallery
app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length);
    return res.redirect(301, req.path.replace(/\/+$/, '') + query);
  }
  next();
});

app.use(legacyRedirects);
app.get('/index.html', (req, res) => res.redirect(301, '/'));

let vite;
let template;
let renderer;

if (dev) {
  const { createServer } = await import('vite');
  vite = await createServer({ root: path.join(root, 'site'), server: { middlewareMode: true }, appType: 'custom' });
  app.use(vite.middlewares);
} else {
  const client = path.join(root, 'dist/client');
  template = fs.readFileSync(path.join(client, 'index.html'), 'utf8');
  renderer = await import(pathToFileURL(path.join(root, 'dist/server/entry-server.js')).href);
  // Files with a hash or version in their name never change: cache them for a year.
  const forever = { immutable: true, maxAge: '1y', index: false, redirect: false };
  app.use('/assets', express.static(path.join(client, 'assets'), forever));
  app.use('/img', express.static(path.join(client, 'img'), forever));
  app.use('/fonts', express.static(path.join(client, 'fonts'), forever));
  app.use(express.static(client, { index: false, redirect: false, maxAge: '1d' }));
}

// Everything the old site served from its static folder, at the same URLs.
app.use(express.static(path.join(root, 'old-site/static'), { index: false, redirect: false, maxAge: '1d' }));

async function load(url) {
  if (!dev) return { template, renderer };
  const raw = fs.readFileSync(path.join(root, 'site/index.html'), 'utf8');
  return { template: await vite.transformIndexHtml(url, raw), renderer: await vite.ssrLoadModule('/entry-server.jsx') };
}

const TEXT_FILES = {
  '/feed.xml': ['feedXml', 'application/rss+xml; charset=utf-8'],
  '/sitemap.xml': ['sitemapXml', 'application/xml; charset=utf-8'],
  '/robots.txt': ['robotsTxt', 'text/plain; charset=utf-8'],
  '/llms.txt': ['llmsTxt', 'text/plain; charset=utf-8'],
};

app.use(async (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  try {
    const { template, renderer } = await load(req.originalUrl);
    const file = TEXT_FILES[req.path];
    if (file) {
      return res.type(file[1]).set('Cache-Control', 'public, max-age=3600').send(renderer[file[0]]());
    }
    const { html, head, status } = renderer.render(req.originalUrl);
    const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
    res.status(status).type('html').set('Cache-Control', 'no-cache').send(page);
  } catch (err) {
    vite?.ssrFixStacktrace(err);
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).type('text').send('Something broke on my end. Sorry! Try again in a bit.');
});

app.listen(PORT, HOST, () => console.log(`liz-lovelace.com on http://${HOST}:${PORT}${dev ? ' (dev)' : ''}`));
