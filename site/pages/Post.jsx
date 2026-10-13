import { posts } from '../posts/index.js';
import { longDate } from '../format.js';

export default function Post({ slug }) {
  const { title, date, Body } = posts[slug];
  return (
    <main className="page post">
      <p className="back"><a href="/">Liz Lovelace</a></p>
      <article>
        <header>
          <h1>{title}</h1>
          <p className="meta"><time dateTime={date}>{longDate(date)}</time></p>
        </header>
        <Body />
      </article>
      <p className="post-end"><a href="/#essays">More essays</a></p>
    </main>
  );
}
