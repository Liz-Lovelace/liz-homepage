// Everything the site says lives here. Pages render it, and the server builds the
// RSS feed, sitemap and llms.txt from it. Plain data, no JSX, so Node scripts can
// import it too (scripts/images.mjs reads `photos` and `projects`).
//
// Dates are 'YYYY-MM-DD' when the day matters and 'YYYY-MM' when it doesn't.

export const site = {
  origin: 'https://liz-lovelace.com',
  name: 'Liz Lovelace',
  description: 'Liz Lovelace’s personal website: things she’s made, essays, pictures, and where to find her.',
  timezone: 'Asia/Almaty',
  city: 'Almaty',
  repo: 'https://github.com/Liz-Lovelace/liz-homepage',
};

// `icon` is a file in /icons/. Every external link on the site carries its site's icon.
export const links = {
  twitter: { name: 'Twitter', handle: '@liz_love_lace', href: 'https://x.com/liz_love_lace', icon: 'x.png' },
  telegram: { name: 'Telegram', handle: '@liz_lovelace', href: 'https://t.me/liz_lovelace', icon: 'telegram.png' },
  discord: { name: 'Discord', handle: 'lizlovelace', href: 'https://discordapp.com/users/967498063121903686', icon: 'discord.png' },
  github: { name: 'GitHub', handle: 'Liz-Lovelace', href: 'https://github.com/Liz-Lovelace', icon: 'github.png' },
  substack: { name: 'Substack', handle: 'lizlovelace', href: 'https://lizlovelace.substack.com', icon: 'substack.png' },
  rss: { name: 'RSS feed', href: '/feed.xml', icon: 'rss.svg' },
};

export const about = {
  tags: 'Rationalist; Heretic; Queer; Trans(fem); Kinkster; Coder; Ainotkilleveryoneist; Chuuni;',
  facts: [
    ['Pronouns', 'she/her (trans)'],
    ['Born in', 'Moscow, Russia'],
    ['Lives in', 'Almaty, Kazakhstan'],
    ['Work', 'programmer'],
  ],
};

export const essays = [
  { title: 'Transition pro tips for the tasteful transfem', hook: 'How to be girl.', date: '2026-07-19', minutes: 9,
    href: 'https://lizlovelace.substack.com/p/transition-pro-tips-for-the-tasteful-transfem' },
  { title: 'Software projects can be more ambitious now', hook: 'Computer programming is still the next big thing.', date: '2026-04-26', minutes: 7,
    href: 'https://lizlovelace.substack.com/p/software-projects-can-be-more-ambitious' },
  { title: 'I dream of being the Perfect Sub', hook: 'The most beautiful part of my sexuality is also the most rotten.', date: '2026-02-24', minutes: 8,
    href: 'https://lizlovelace.substack.com/p/i-dream-of-being-the-perfect-sub' },
  { title: 'My software recommendations', hook: 'Stuff I can recommend, and some takes.', date: '2026-01-30', minutes: 10,
    href: 'https://lizlovelace.substack.com/p/my-software-recommendations' },
  { title: 'Factorio: e/acc update', hook: 'What if you don’t get into the rocket?', date: '2024-10-13', minutes: 2,
    href: '/blog/factorio' },
  { title: 'Robust Trust', hook: 'Relying on others without being vulnerable to betrayal.', date: '2023-07-03', minutes: 3,
    href: '/blog/robust-trust' },
];

// `image` names a file in content/projects/ (processed by scripts/images.mjs). The main
// link shows the site's address unless `label` says otherwise.
export const projects = [
  {
    id: 'skin-deep', title: 'Skin Deep', kind: 'Art', date: '2026-09',
    href: 'https://skin-deep.liz-lovelace.com', icon: 'skin-deep.png',
    text: 'An infinitely zoomable photomosaic made of about 15,000 softcore photos. Every picture is made of smaller pictures, and you can keep zooming forever.',
    cw: 'nudity',
    more: [{ label: 'How it works', href: 'https://github.com/Liz-Lovelace/skin-deep', icon: 'github.png' }],
  },
  {
    id: 'diycpu', title: 'diycpu', kind: 'Tech demo', date: '2026-07',
    text: 'A CPU built out of individual logic gates, in an editor I wrote for it in Rust. Right now it counts in binary on a 16-segment display. Work in progress, the code isn’t public yet.',
    image: 'diycpu.webp', imageAlt: 'A dark circuit editor showing a ripple counter wired from logic gates',
  },
  {
    id: 'muon', title: 'Camera muon detector', kind: 'Tech demo', date: '2026-06',
    href: 'https://github.com/Liz-Lovelace/camera-muon-detector', icon: 'github.png', label: 'Code and photos on GitHub',
    text: 'I turned an old Sony point-and-shoot into a cosmic-ray detector. Long exposures in a dark room: muons passing through the sensor leave dots and streaks.',
    image: 'muon.webp', imageAlt: 'A grid of black camera frames with small bright dots and streaks left by muons',
  },
  {
    id: 'quantum', title: 'Quantum Decoherence Generator', kind: 'Art', date: '2024-09',
    href: 'https://quantum.liz-lovelace.com', icon: 'quantum.png',
    text: 'Splits your reality every once in a while, as a practical joke on God.',
    image: 'quantum.webp', imageAlt: 'The Quantum Decoherence Generator web page',
  },
  {
    id: 'ely', title: 'Ely Timer', kind: 'Tool', date: '2023-06',
    href: 'https://ely.liz-lovelace.com', icon: 'ely.png',
    text: 'Shouts at you to get back to work every 25 minutes.',
    image: 'ely.webp', imageAlt: 'The Ely Timer web page',
  },
];

export const clientWork = [
  { title: 'Welcome Places', href: 'https://welcomeplaces.info', icon: 'welcomeplaces.png',
    text: 'a tourist guide to Kazakhstan in 12 languages, with its own CMS and AI translation.' },
  { title: 'MyCookingAI',
    text: 'a Telegram mini app that plans a month of meals for owners of Kenwood kitchen robots.' },
];

// What's new, newest first. Each entry reads as one sentence: `before`, then the
// linked `title` (plain text if there's no `href`), then `after`. `rss: false` keeps an entry off the RSS feed (it
// still shows on the site), e.g. for a new selfie that's only worth a tweet.
export const updates = [
  { date: '2026-10-14', title: 'Redesigned this website', after: ': white, quiet, everything on one page.' },
  { date: '2026-09-06', title: 'Skin Deep', href: 'https://skin-deep.liz-lovelace.com', icon: 'skin-deep.png', after: ', an infinitely zoomable photomosaic.' },
  { date: '2026-07-19', before: 'Essay: ', title: 'Transition pro tips for the tasteful transfem', href: essays[0].href, icon: 'substack.png' },
  { date: '2026-06-20', title: 'Camera muon detector', href: 'https://github.com/Liz-Lovelace/camera-muon-detector', icon: 'github.png', after: ': catching cosmic rays with a point-and-shoot.' },
  { date: '2026-04-26', before: 'Essay: ', title: 'Software projects can be more ambitious now', href: essays[1].href, icon: 'substack.png' },
  { date: '2026-02-24', before: 'Essay: ', title: 'I dream of being the Perfect Sub', href: essays[2].href, icon: 'substack.png' },
  { date: '2026-01-30', before: 'Essay: ', title: 'My software recommendations', href: essays[3].href, icon: 'substack.png' },
  { date: '2024-10-13', before: 'Very short story: ', title: 'Factorio: e/acc update', href: '/blog/factorio' },
  { date: '2024-09-11', title: 'Quantum Decoherence Generator', href: 'https://quantum.liz-lovelace.com', icon: 'quantum.png', after: ', a practical joke on God.' },
];

export const neighbors = [
  { name: 'msx', href: 'https://heckscaper.com/landing.php', icon: 'heckscaper.png',
    why: 'Music, games, tools, and a thousand other projects. My favorite personal website.' },
  { name: 'Tim Izhanov', href: 'https://tim.izhanov.ru/', icon: 'web.svg',
    why: 'My designer friend. He’s the reason this site is set in Inter.' },
  { name: 'meowtase’s skincare guide', href: 'https://slop.sus.cat/health/skin-research/webapp/index.html', icon: 'web.svg',
    why: 'The best skincare guide on the internet.' },
  { name: 'Meaningness', href: 'https://meaningness.com', icon: 'meaningness.png',
    why: 'David Chapman on meaning, nebulosity, and what comes after rationalism.' },
  { name: 'LessWrong', href: 'https://www.lesswrong.com', icon: 'lesswrong.png',
    why: 'Where I learned to think about thinking.' },
  { name: 'turnmeintoagirl.com', href: 'https://turnmeintoagirl.com/', icon: 'turnmeintoagirl.png',
    why: 'Exactly what it says.' },
  { name: 'How to become a hacker', href: 'http://www.catb.org/~esr/faqs/hacker-howto.html', icon: 'catb.png',
    why: 'Eric S. Raymond’s old FAQ. Still right.' },
];

// The gallery, in display order. `file` is in content/photos/. Captions show in the
// big view only, so most photos don't have one.
//
// The `nudes` group isn't linked from anywhere: it lives at /gallery/nudes so the old
// site's /gallery?t=porn link still leads somewhere, and search engines are told to
// skip it. Captions there are the old site's, unchanged.
export const photoGroups = [
  { id: 'me', title: 'Me' },
  { id: 'avatars', title: 'Avatars' },
  { id: 'other', title: 'Other' },
  { id: 'nudes', title: 'Nudes', hidden: true },
];

export const photos = [
  { id: 'short-hair', group: 'me', file: 'short-hair.jpeg',
    alt: 'Liz with shoulder-length pink hair and a choker, in a black-and-white patterned shirt, smiling a little' },
  { id: 'spiky-choker', group: 'me', file: 'spiky-choker.jpg',
    alt: 'Liz on a sunny street with pink hair and a spiky choker, smirking' },
  { id: 'half-smile', group: 'me', file: 'half-smile.jpeg',
    alt: 'Liz on a tree-lined street, blonde hair fading to pink, looking at the camera' },
  { id: 'dementia', group: 'me', file: 'dementia.jpg', caption: 'A random grandpa outside took this pic',
    alt: 'Liz standing next to a blooming tree in front of a bank, pink hair, patterned shirt and black trousers' },
  { id: 'femme-look', group: 'me', file: 'femme-look.jpg',
    alt: 'Close-up of Liz with long auburn hair, looking into the camera' },
  { id: 'naked-pink-hair', group: 'me', file: 'naked-pink-hair.jpg',
    alt: 'Selfie of Liz with long magenta hair and bare shoulders' },
  { id: 'butch-liz', group: 'me', file: 'butch-liz.jpg', caption: 'Butch Liz v0.1',
    alt: 'Mirror selfie of Liz in a black tank top and black jeans' },
  { id: 'point-up', group: 'me', file: 'point-up.jpg', caption: 'Old pic, I’m about 16 here',
    alt: 'Teenage Liz with long brown hair and a cat-ear headband, pointing up, in a red T-shirt' },
  { id: 'midjourney-liz', group: 'avatars', file: 'midjourney-liz.png', caption: 'My profile picture almost everywhere, made with Midjourney',
    alt: 'Anime-style portrait of Liz with spiky pink hair, blue eyes, a fanged grin and a spiked choker' },
  { id: 'picrew-bag', group: 'avatars', file: 'picrew-bag.png',
    alt: 'Picrew drawing of Liz with long pink hair and cat ears, holding a phone and a grocery bag' },
  { id: 'picrew-fist', group: 'avatars', file: 'picrew-fist.png', caption: 'Made this Picrew to match a girlfriend',
    alt: 'Chibi Picrew drawing of Liz with pink hair and a black cat hair clip, on a yellow polka-dot background' },
  { id: 'star-scar', group: 'other', file: 'star-scar.jpg', caption: 'My first dom had me carve this into my hand',
    alt: 'The back of Liz’s hand with a healed scar shaped like a sun' },

  { id: 'pose', group: 'nudes', file: 'pose.jpg', caption: 'in Bangkok :3c', alt: 'Nude photo of Liz' },
  { id: 'bedroom-ropes-butt', group: 'nudes', file: 'bedroom-ropes-butt.png', caption: 'what a cute butt!', alt: 'Nude photo of Liz tied with ropes' },
  { id: 'pasties', group: 'nudes', file: 'pasties.jpg', caption: 'pasties are cool', alt: 'Topless photo of Liz wearing pasties' },
  { id: 'hearts-and-belly', group: 'nudes', file: 'hearts-and-belly.jpg', caption: 'first time I really noticed breast growth', alt: 'Topless photo of Liz' },
  { id: 'radioactive', group: 'nudes', file: 'radioactive.png', caption: 'radioactive girl', alt: 'Nude photo of Liz' },
  { id: 'sophia-peacefullness', group: 'nudes', file: 'sophia-peacefullness.jpg', caption: 'tied and grounded', alt: 'Photo of Liz tied up' },
  { id: 'wax-sophia-closeup', group: 'nudes', file: 'wax-sophia-closeup.jpg', caption: 'wax play!', alt: 'Close-up of wax play on Liz’s skin' },
  { id: 'calculator', group: 'nudes', file: 'calculator.jpg', caption: 'pre-hrt nipples :D', alt: 'Topless photo of Liz' },
  { id: 'bedroom-ropes-rotissary', group: 'nudes', file: 'bedroom-ropes-rotissary.png', caption: 'roast me over a bonfire :3', alt: 'Nude photo of Liz tied with ropes' },
  { id: 'frog', group: 'nudes', file: 'frog.jpg', caption: 'pepis >///<', alt: 'Nude photo of Liz' },
];

// The two pictures at the top of the home page: square crops made by scripts/images.mjs.
// `crop` is [left, top, size] in source pixels.
export const portraits = [
  { id: 'portrait-face', file: 'short-hair.jpeg', crop: [110, 60, 640],
    alt: 'Photo of Liz: pink hair, choker, a little smile' },
  { id: 'portrait-avatar', file: 'midjourney-liz.png', crop: [0, 0, 493],
    alt: 'Liz’s avatar: an anime girl with spiky pink hair and a fanged grin' },
];
