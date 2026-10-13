import images from '../images.json';

// A responsive image from scripts/images.mjs: the browser picks the file that fits
// `sizes`, the width/height attributes reserve space so nothing jumps, and the
// image's average colour shows while it loads.
export default function Img({ id, alt, sizes, eager = false, className, ...rest }) {
  const im = images[id];
  if (!im) return null;
  const widths = Object.keys(im.files).map(Number).sort((a, b) => a - b);
  const fallback = im.files[widths.find((w) => w >= 640) ?? widths.at(-1)];
  return (
    <img
      src={fallback}
      srcSet={widths.map((w) => `${im.files[w]} ${w}w`).join(', ')}
      sizes={sizes}
      width={im.w}
      height={im.h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      className={className}
      style={{ backgroundColor: im.color }}
      {...rest}
    />
  );
}

export const ratio = (id) => images[id].w / images[id].h;
export const smallest = (id) => {
  const files = images[id].files;
  return files[Math.min(...Object.keys(files).map(Number).filter((w) => w >= 320))];
};
