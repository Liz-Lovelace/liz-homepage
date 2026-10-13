import { about, clientWork, essays, links, neighbors, photos, portraits, projects } from '../data.js';
import { monthYear, year } from '../format.js';
import A, { LIZ } from '../components/A.jsx';
import Img, { ratio } from '../components/Img.jsx';
import LocalTime from '../components/LocalTime.jsx';
import WhatsNew from '../components/WhatsNew.jsx';

const STRIP = ['spiky-choker', 'picrew-fist', 'dementia', 'femme-look', 'butch-liz'];
const listedPhotos = photos.filter((p) => p.group !== 'nudes');

export default function Home() {
  return (
    <main className="page home">
      <header className="masthead">
        <div className="portraits">
          <a href="/gallery/short-hair" aria-label="Photo of Liz, full size">
            <Img id="portrait-face" alt={portraits[0].alt} sizes="128px" eager />
          </a>
          <a href="/gallery/midjourney-liz" aria-label="Liz’s avatar, full size">
            <Img id="portrait-avatar" alt={portraits[1].alt} sizes="128px" eager />
          </a>
        </div>
        <h1>Liz Lovelace</h1>
        <p className="tags">{about.tags}</p>
        <dl className="facts">
          {about.facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </header>

      <section className="hello" aria-label="Hello">
        <p>
          Hi, I’m Liz. I’m a programmer, an essayist, and a Twitter shitposter. This is my personal
          website: things I’ve made, things I’ve written, and pictures of me.
        </p>
        <p>
          I post on <A href={links.twitter.href} icon={links.twitter.icon}>Twitter</A> almost every day,
          about AI, gender, rationality, and whatever else is on my mind.
        </p>
      </section>

      <div className="follow">
        <a className="follow-card" href={links.twitter.href}>
          <img src="/icons/x-logo.svg" alt="" width="28" height="28" fetchPriority="low" />
          <span>
            <span className="follow-title">Follow me on Twitter</span>
            <span className="follow-handle">{links.twitter.handle}</span>
          </span>
        </a>
        <picture className="doodle">
          <source media="(max-width: 600px)" srcSet="/doodles/im-here-most-down.svg" width="200" height="76" />
          <img src="/doodles/im-here-most.svg" alt="I’m here most" width="200" height="56" />
        </picture>
      </div>

      <p className="contact">
        To message me, use <A href={links.telegram.href} icon={links.telegram.icon}>Telegram</A> or{' '}
        <A href={links.discord.href} icon={links.discord.icon}>Discord</A>. My Twitter DMs are open too.
        It’s <LocalTime /> right now.
      </p>

      <WhatsNew />

      <section id="pictures" aria-labelledby="pictures-h">
        <h2 id="pictures-h">Pictures</h2>
        <ul className="strip">
          {STRIP.map((id) => {
            const p = photos.find((x) => x.id === id);
            return (
              <li key={id} style={{ '--ratio': ratio(id).toFixed(4) }}>
                <a href={`/gallery/${id}`}><Img id={id} alt={p.alt} sizes={`${Math.round(150 * ratio(id))}px`} /></a>
              </li>
            );
          })}
        </ul>
        <p><A href="/gallery" icon={LIZ}>{`All ${listedPhotos.length} pictures`}</A></p>
      </section>

      <section id="made" aria-labelledby="made-h">
        <h2 id="made-h">Things I made</h2>
        {projects.map((p) => <Project key={p.id} p={p} />)}
      </section>

      <section id="essays" aria-labelledby="essays-h">
        <h2 id="essays-h">Essays</h2>
        <ul className="list">
          {essays.map((e) => (
            <li key={e.href}>
              <A href={e.href} icon={e.href.startsWith('/') ? LIZ : links.substack.icon} className="item-link">{e.title}</A>
              <p>{e.hook} <span className="meta">{monthYear(e.date)}, {e.minutes}&nbsp;min</span></p>
            </li>
          ))}
        </ul>
        <p className="aside">
          New essays go out by email from <A href={links.substack.href} icon={links.substack.icon}>my Substack</A>.
        </p>
      </section>

      <section id="hire" className="hire" aria-labelledby="hire-h">
        <h2 id="hire-h">Hire me</h2>
        <p>
          I build web apps, Telegram mini apps and AI tools, usually on my own and fast. Tell me what
          you want built, and I’ll tell you honestly how long it would take and whether I’m the right
          person for it.
        </p>
        <p>Recent client work:</p>
        <ul className="list">
          {clientWork.map((w) => (
            <li key={w.title}>
              {w.href ? <A href={w.href} icon={w.icon} className="item-link">{w.title}</A> : <strong className="item-link">{w.title}</strong>}
              <p>{w.text[0].toUpperCase() + w.text.slice(1)}</p>
            </li>
          ))}
        </ul>
        <p><A href={links.telegram.href} icon={links.telegram.icon}>Message me on Telegram</A></p>
      </section>

      <section id="websites" aria-labelledby="websites-h">
        <h2 id="websites-h">Websites I like</h2>
        <ul className="list">
          {neighbors.map((n) => (
            <li key={n.href}>
              <A href={n.href} icon={n.icon} className="item-link">{n.name}</A>
              <p>{n.why}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function Project({ p }) {
  const host = p.href && new URL(p.href).host.replace(/^www\./, '');
  const shot = p.image && (
    <Img
      id={`project-${p.id}`}
      alt={p.imageAlt}
      sizes="(max-width: 600px) 100vw, 240px"
    />
  );
  return (
    <article className="project" id={p.id}>
      {shot && (p.href ? <a className="shot" href={p.href} tabIndex={-1} aria-hidden="true">{shot}</a> : <div className="shot">{shot}</div>)}
      <h3>{p.title}</h3>
      <p className="meta">
        {p.kind}, {year(p.date)}
        {p.cw && <><br /><span className="cw">Content warning: {p.cw}</span></>}
      </p>
      <p>{p.text}</p>
      {(p.href || p.more) && (
        <p className="project-links">
          {p.href && <A href={p.href} icon={p.icon}>{p.label ?? host}</A>}
          {p.more?.map((m) => <A key={m.href} href={m.href} icon={m.icon}>{m.label}</A>)}
        </p>
      )}
    </article>
  );
}
