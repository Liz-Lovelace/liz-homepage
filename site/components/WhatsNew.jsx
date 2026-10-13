import { useEffect, useState } from 'react';
import { updates, links } from '../data.js';
import { dayMonth, longDate, year } from '../format.js';
import { previousVisit } from '../visits.js';
import A, { LIZ } from './A.jsx';

const SHOWN = 4;

// The latest updates. A returning visitor sees what appeared since their last visit,
// marked "new", plus the newest thing they've already seen, so they know where the
// new stuff ends. The rest fold away under "more".
export default function WhatsNew() {
  // The server (and the first browser render) can't know about past visits.
  const [visit, setVisit] = useState(undefined);
  useEffect(() => setVisit(previousVisit()), []);

  const fresh = visit ? updates.filter((u) => u.date > visit.seen).length : 0;
  const shown = visit && fresh ? fresh + 1 : SHOWN;

  return (
    <section id="new" aria-labelledby="new-h">
      <h2 id="new-h">What’s new</h2>
      {visit && <p className="since">{sinceText(fresh, visit.at)}</p>}
      <UpdateList items={updates.slice(0, shown)} fresh={fresh} />
      {updates.length > shown && (
        <details className="more">
          <summary>{updates.length - shown} older updates</summary>
          <UpdateList items={updates.slice(shown)} offset={shown} />
        </details>
      )}
      <p className="aside">
        Updates also go to the <A href={links.rss.href} icon={links.rss.icon}>RSS feed</A>.
      </p>
    </section>
  );
}

function UpdateList({ items, fresh = 0, offset = 0 }) {
  return (
    <ol className="updates">
      {items.map((u, i) => {
        const index = offset + i;
        const firstOfYear = index === 0 || year(updates[index - 1].date) !== year(u.date);
        return (
          <li key={u.date + u.title}>
            <span className="update-year">{firstOfYear ? year(u.date) : ''}</span>
            <time dateTime={u.date} title={longDate(u.date)}>{dayMonth(u.date)}</time>
            <span className="update-body">
              {u.before}
              {u.href ? <A href={u.href} icon={u.icon ?? (u.href.startsWith('/') ? LIZ : undefined)}>{u.title}</A> : u.title}
              {u.after}
              {index < fresh && <> <span className="new">New</span></>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function sinceText(fresh, at) {
  const when = relativeDay(at);
  if (!fresh) return `Nothing new since your last visit ${when}.`;
  return `${fresh === 1 ? 'One new thing' : `${fresh} new things`} since your last visit ${when}.`;
}

function relativeDay(iso) {
  const then = new Date(iso);
  const days = Math.floor((startOfDay(new Date()) - startOfDay(then)) / 864e5);
  if (days <= 0) return 'earlier today';
  if (days === 1) return 'yesterday';
  const date = then.toISOString().slice(0, 10);
  const sameYear = date.slice(0, 4) === String(new Date().getFullYear());
  return `on ${sameYear ? dayMonth(date) : longDate(date)}`;
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
