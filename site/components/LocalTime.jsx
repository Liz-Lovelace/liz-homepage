import { useEffect, useState } from 'react';
import { site } from '../data.js';
import { clock, utcOffset } from '../format.js';

// "23:41 in Almaty (3 hours ahead of you)". The server renders the time; the
// browser keeps it ticking and adds the difference from the visitor's own clock.
export default function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <time suppressHydrationWarning>{clock(site.timezone, now)}</time> in {site.city}
      {mounted && ` (${difference(now)})`}
    </>
  );
}

function difference(now) {
  const hours = (utcOffset(site.timezone, now) + now.getTimezoneOffset()) / 60;
  if (hours === 0) return 'same time as you';
  const n = Math.abs(hours);
  const amount = `${Number.isInteger(n) ? n : n.toFixed(2).replace(/\.?0+$/, '')} hour${n === 1 ? '' : 's'}`;
  return `${amount} ${hours > 0 ? 'ahead of' : 'behind'} you`;
}
