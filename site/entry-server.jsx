// Server entry: renders a page to HTML for one request. Also exports the plain-text
// files (RSS feed, sitemap, robots.txt, llms.txt), which are built from the same data.
import { renderToString } from 'react-dom/server';
import { Router } from './router.jsx';
import App from './App.jsx';
import { matchRoute } from './routes.js';
import { getMeta, headHtml } from './meta.js';
import { site } from './data.js';

export function render(url) {
  const route = matchRoute(new URL(url, site.origin).pathname);
  const html = renderToString(
    <Router url={url}>
      <App />
    </Router>
  );
  return { html, head: headHtml(getMeta(route)), status: route.name === 'notfound' ? 404 : 200 };
}

export { feedXml, sitemapXml, robotsTxt, llmsTxt } from './files.js';
