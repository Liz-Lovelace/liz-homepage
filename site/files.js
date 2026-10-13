// Files for feed readers, crawlers and AI agents, built from the same data as the pages.

import { site, links, about, updates, essays, projects, clientWork, neighbors, photos, photoGroups } from './data.js';
import { posts } from './posts/index.js';

const abs = (href) => (href.startsWith('/') ? site.origin + href : href);
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Updates dated by month only count as the 1st; noon UTC keeps the day the same everywhere.
const rfc822 = (date) => new Date(`${date.length === 7 ? date + '-01' : date}T12:00:00Z`).toUTCString();

export function feedXml() {
  const items = updates.filter((u) => u.rss !== false);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${xml(site.name)}</title>
<link>${site.origin}/</link>
<atom:link href="${site.origin}/feed.xml" rel="self" type="application/rss+xml"/>
<description>New things on liz-lovelace.com: projects, essays, and changes to the site.</description>
<language>en</language>
<lastBuildDate>${rfc822(items[0].date)}</lastBuildDate>
${items.map((u) => `<item>
<title>${xml((u.before ?? '') + u.title)}</title>
<link>${xml(abs(u.href ?? '/'))}</link>
<guid isPermaLink="false">${xml(`${u.date} ${u.title}`)}</guid>
<pubDate>${rfc822(u.date)}</pubDate>
<description>${xml(`${u.before ?? ''}${u.title}${u.after ?? ''}`)}</description>
</item>`).join('\n')}
</channel>
</rss>
`;
}

export function sitemapXml() {
  const pages = [
    { path: '/', date: updates[0].date },
    { path: '/gallery' },
    ...Object.entries(posts).map(([slug, p]) => ({ path: `/blog/${slug}`, date: p.date })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `<url><loc>${site.origin}${p.path}</loc>${p.date ? `<lastmod>${p.date}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
}

export function robotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`;
}

// https://llmstxt.org: a plain Markdown summary of the whole site, for AI agents.
export function llmsTxt() {
  const listed = new Set(photoGroups.filter((g) => !g.hidden).map((g) => g.id));
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Liz Lovelace is a programmer, essayist and Twitter poster. ${about.facts.map(([k, v]) => `${k}: ${v}`).join('. ')}.`,
    `She describes herself as: ${about.tags}`,
    '',
    '## Where to find her',
    '',
    ...[links.twitter, links.telegram, links.discord, links.github, links.substack].map((l) => `- [${l.name}](${l.href}): ${l.handle}`),
    `- [RSS feed of this site](${site.origin}/feed.xml)`,
    '',
    '## Essays',
    '',
    ...essays.map((e) => `- [${e.title}](${abs(e.href)}) (${e.date.slice(0, 7)}): ${e.hook}`),
    '',
    '## Things she made',
    '',
    ...projects.map((p) => `- ${p.href ? `[${p.title}](${p.href})` : p.title} (${p.kind}, ${p.date.slice(0, 4)}): ${p.text}`),
    '',
    '## Client work (she is available for hire)',
    '',
    ...clientWork.map((w) => `- ${w.href ? `[${w.title}](${w.href})` : w.title}: ${w.text}`),
    '',
    '## Pictures',
    '',
    ...photos.filter((p) => listed.has(p.group)).map((p) => `- [${p.alt}](${site.origin}/gallery/${p.id})`),
    '',
    '## Websites she likes',
    '',
    ...neighbors.map((n) => `- [${n.name}](${n.href}): ${n.why}`),
    '',
  ];
  return lines.join('\n');
}
