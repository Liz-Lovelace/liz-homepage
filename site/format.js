// Dates are written by hand rather than with Intl, so the server and the browser
// always produce exactly the same text (hydration needs that).

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const NBSP = ' ';

// '2026-09-06' -> '6 Sep', '2026-09' -> 'Sep'
export function dayMonth(date) {
  const [, m, d] = date.split('-').map(Number);
  return d ? `${d}${NBSP}${MONTHS[m - 1]}` : MONTHS[m - 1];
}

// '2026-09-06' or '2026-09' -> 'Sep 2026'
export function monthYear(date) {
  const [y, m] = date.split('-').map(Number);
  return `${MONTHS[m - 1]}${NBSP}${y}`;
}

// '2026-09-06' -> '6 September 2026'
export function longDate(date) {
  const [y, m, d] = date.split('-').map(Number);
  return d ? `${d}${NBSP}${MONTHS_LONG[m - 1]} ${y}` : `${MONTHS_LONG[m - 1]} ${y}`;
}

export const year = (date) => date.slice(0, 4);

// Time in a timezone as 'HH:MM' (24-hour).
export function clock(timeZone, now = new Date()) {
  return new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(now);
}

// Minutes the timezone is ahead of UTC right now.
export function utcOffset(timeZone, now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
      .formatToParts(now).map((p) => [p.type, p.value])
  );
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  const minute = Math.floor(now.getTime() / 60000) * 60000;
  return Math.round((asUtc - minute) / 60000);
}
