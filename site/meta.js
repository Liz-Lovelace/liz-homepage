// <head> tags for each page: title, description, link previews (Open Graph, Twitter
// cards), canonical URL, and schema.org data for crawlers.

import { site, links, photos, photoGroups, portraits, about } from './data.js';
import { posts } from './posts/index.js';
import images from './images.json';

const hiddenGroups = new Set(photoGroups.filter((g) => g.hidden).map((g) => g.id));
const ogImage = { src: '/og.png', w: 1200, h: 630, alt: 'Liz Lovelace: two pictures of Liz and her name' };

// The largest generated file up to 1600px wide: big enough for link previews.
function photoFile(id) {
  const { files } = images[id];
  const widths = Object.keys(files).map(Number).sort((a, b) => a - b);
  const w = widths.filter((x) => x <= 1600).at(-1) ?? widths[0];
  const { w: W, h: H } = images[id];
  return { src: files[w], w, h: Math.round((w * H) / W) };
}

export function getMeta(route) {
  if (route.name === 'home') {
    return {
      title: site.name,
      description: site.description,
      path: '/',
      image: ogImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        url: site.origin + '/',
        image: site.origin + photoFile('portrait-face').src,
        jobTitle: 'Programmer',
        birthPlace: 'Moscow, Russia',
        homeLocation: { '@type': 'Place', name: 'Almaty, Kazakhstan' },
        sameAs: [links.twitter.href, links.github.href, links.substack.href, links.telegram.href],
        description: about.tags,
      },
    };
  }

  if (route.name === 'gallery' && route.photo) {
    const p = photos.find((x) => x.id === route.photo);
    const f = photoFile(p.id);
    return {
      title: `${p.caption ?? 'Picture'} · ${site.name}`,
      description: p.alt,
      path: `/gallery/${p.id}`,
      image: { ...f, alt: p.alt },
      noindex: hiddenGroups.has(p.group),
    };
  }

  if (route.name === 'gallery') {
    return route.hidden
      ? { title: `Nudes · ${site.name}`, description: 'Content warning: nudity.', path: '/gallery/nudes', noindex: true }
      : {
          title: `Pictures · ${site.name}`,
          description: 'Pictures of Liz Lovelace: photos of me, my avatars, and a scar.',
          path: '/gallery',
          image: { ...photoFile(portraits[0].id), alt: portraits[0].alt },
        };
  }

  if (route.name === 'post') {
    const post = posts[route.slug];
    return {
      title: `${post.title} · ${site.name}`,
      description: post.description,
      path: `/blog/${route.slug}`,
      type: 'article',
      published: post.date,
      image: post.image ? { src: post.image, alt: post.title } : ogImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `${site.origin}/blog/${route.slug}`,
        author: { '@type': 'Person', name: site.name, url: site.origin + '/' },
      },
    };
  }

  return { title: `Nothing here · ${site.name}`, description: 'There’s no page at this address.', noindex: true };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function headHtml(m) {
  const url = m.path && site.origin + m.path;
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    m.noindex && '<meta name="robots" content="noindex">',
    url && `<link rel="canonical" href="${url}">`,
    `<meta property="og:site_name" content="${site.name}">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.description)}">`,
    `<meta property="og:type" content="${m.type ?? 'website'}">`,
    url && `<meta property="og:url" content="${url}">`,
    m.published && `<meta property="article:published_time" content="${m.published}">`,
    m.image && `<meta property="og:image" content="${site.origin + m.image.src}">`,
    m.image?.w && `<meta property="og:image:width" content="${m.image.w}">`,
    m.image?.h && `<meta property="og:image:height" content="${m.image.h}">`,
    m.image && `<meta property="og:image:alt" content="${esc(m.image.alt)}">`,
    `<meta name="twitter:card" content="${m.image ? 'summary_large_image' : 'summary'}">`,
    `<meta name="twitter:site" content="${links.twitter.handle}">`,
    m.jsonLd && `<script type="application/ld+json">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n');
}
