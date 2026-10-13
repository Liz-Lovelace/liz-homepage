# liz-lovelace.com

Liz Lovelace's personal website. React, rendered on the server by a small Express
app, so every page arrives as finished HTML and then behaves like an app (links
switch pages in place, Back/Forward and scroll positions work like a normal site).

## Running it

    npm install
    npm run dev          # http://localhost:3000 with hot reload
    npm run build        # makes dist/ (and resizes images)
    npm start            # serves dist/ like production

`BIND_HOST=127.0.0.1` keeps the server off the public network interface; `PORT`
changes the port.

## Where things are

- `site/data.js`: everything the site says: links, essays, projects, updates, photos.
  Most changes are an edit here.
- `site/pages/`, `site/components/`: the pages. `site/styles.css`: all the styles.
- `site/posts/`: essays that live on this site (each one a component, so it can have its own layout).
- `content/photos/`, `content/projects/`: original images. `scripts/images.mjs` makes
  the web sizes (into `site/public/img/`, not committed).
- `content/drafts/`: unpublished writing. Not on the site.
- `server/`: the web server and old-URL redirects.
- `old-site/`: the previous SvelteKit version, kept as it was (see `old-site/SNAPSHOT.md`).

## Adding things

- **An update** (shows in "What's new" and the RSS feed): add a line at the top of
  `updates` in `site/data.js`. Visitors who were here before see it marked "new".
- **A photo**: put the file in `content/photos/`, add it to `photos` in `site/data.js`.
- **An essay on Substack**: add it to `essays` (and usually `updates`).

## Old links never break

Every URL this site has ever published must keep working. If something moves or goes
away, its old URL redirects to the same thing or to a hidden page that has it
(`server/legacy.js`). Files the old site served are still served from
`old-site/static`. Before shipping, run the check against a running server:

    node scripts/check-links.mjs http://127.0.0.1:3000

## Deploying

Build the image on a dev machine and push it to Docker Hub:

    docker buildx build --platform linux/amd64 -t lizlovelace/liz-homepage:latest --push .

On the server, a folder with `docker-compose.yml` (from this repo) and a `.env` next to
it runs it:

    docker compose pull && docker compose up -d

The container listens on port 3000, published on 127.0.0.1 only; a reverse proxy
serves the domain. The site needs no environment variables and keeps no state.

Ideas for later live in `LATER.md`.
