// Turns the source images in content/ into the resized WebP files the site serves,
// plus site/images.json, which tells the pages each image's size, colour and files.
//
//   content/photos/*    -> gallery photos and the two portraits on the home page
//   content/projects/*  -> project screenshots
//
// Output goes to site/public/img/ (served at /img/). File names carry a hash of the
// source and settings, so the server can cache them forever and a changed source
// gets a new name. Unchanged images are skipped, so re-running is cheap.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { photos, portraits, projects } from '../site/data.js';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'site/public/img');
const manifestPath = path.join(root, 'site/images.json');

const jobs = [
  ...photos.map((p) => ({ id: p.id, src: `content/photos/${p.file}`, widths: [320, 640, 1080, 1600, 2400], quality: 80 })),
  ...portraits.map((p) => ({ id: p.id, src: `content/photos/${p.file}`, crop: p.crop, widths: [128, 256, 384], quality: 85 })),
  ...projects.filter((p) => p.image).map((p) => ({ id: `project-${p.id}`, src: `content/projects/${p.image}`, widths: [400, 800, 1280], quality: 85 })),
];

fs.mkdirSync(outDir, { recursive: true });
const manifest = {};
const keep = new Set();
let made = 0;

for (const job of jobs) {
  const input = fs.readFileSync(path.join(root, job.src));
  const hash = crypto.createHash('sha1').update(input).update(JSON.stringify([job.crop, job.widths, job.quality])).digest('hex').slice(0, 8);
  const base = `${job.id}.${hash}`;

  // rotate() applies EXIF orientation, so phone photos come out the right way up.
  let img = sharp(input).rotate();
  if (job.crop) {
    const [left, top, size] = job.crop;
    img = img.extract({ left, top, width: size, height: size });
  }
  const pipeline = () => img.clone();
  const { width, height } = await pipeline().toBuffer({ resolveWithObject: true }).then((r) => r.info);
  // Every target width the source can fill (skipping ones within 10% of the source's own
  // width), plus the source width itself when it's below the largest target.
  const widths = job.widths.filter((w) => w < width * 0.9);
  if (width <= job.widths.at(-1)) widths.push(width);

  const files = {};
  for (const w of widths) {
    const name = `${base}-${w}.webp`;
    files[w] = `/img/${name}`;
    keep.add(name);
    const file = path.join(outDir, name);
    if (fs.existsSync(file)) continue;
    await pipeline().resize({ width: w }).webp({ quality: job.quality, effort: 5 }).toFile(file);
    made++;
  }

  // Average colour: shown while the image loads, so the page never flashes empty boxes.
  const pixel = await pipeline().resize(1, 1, { fit: 'fill' }).removeAlpha().raw().toBuffer();
  const color = '#' + [...pixel].map((c) => c.toString(16).padStart(2, '0')).join('');

  manifest[job.id] = { w: width, h: height, color, files };
}

// Drop outputs no image refers to any more (old hashes, removed photos).
for (const name of fs.readdirSync(outDir)) {
  if (!keep.has(name)) fs.rmSync(path.join(outDir, name));
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + '\n');
console.log(`images: ${Object.keys(manifest).length} images, ${made} files written`);
