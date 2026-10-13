import { useEffect } from 'react';
import { links, site, updates } from './data.js';
import { matchRoute } from './routes.js';
import { getMeta } from './meta.js';
import { useBrowserRouting, useUrl } from './router.jsx';
import { trackVisit } from './visits.js';
import A from './components/A.jsx';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import Post from './pages/Post.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const url = useUrl();
  const route = matchRoute(new URL(url, site.origin).pathname);
  useBrowserRouting();

  useEffect(() => {
    document.title = getMeta(route).title;
  }, [url]);

  useEffect(() => trackVisit(updates[0].date), []);

  let page;
  if (route.name === 'home') page = <Home />;
  else if (route.name === 'gallery') page = <Gallery photo={route.photo} hidden={route.hidden} />;
  else if (route.name === 'post') page = <Post slug={route.slug} />;
  else page = <NotFound />;

  return (
    <>
      {page}
      <Footer wide={route.name === 'gallery'} />
    </>
  );
}

function Footer({ wide }) {
  const where = [links.twitter, links.telegram, links.discord, links.github, links.substack, links.rss];
  return (
    <footer className={wide ? 'site-foot wide' : 'site-foot'}>
      <ul className="foot-links">
        {where.map((l) => <li key={l.href}><A href={l.href} icon={l.icon}>{l.name}</A></li>)}
      </ul>
      <p>
        Everything here is public domain (<a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>),
        so take what you like. <a href={site.repo}>Source code</a>
      </p>
    </footer>
  );
}
