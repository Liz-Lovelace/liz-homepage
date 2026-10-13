import A, { LIZ } from '../components/A.jsx';

export default function NotFound() {
  return (
    <main className="page">
      <p className="back"><a href="/">Liz Lovelace</a></p>
      <h1>Nothing here</h1>
      <p>
        There’s no page at this address. If a link brought you here, it’s my fault: tell me on{' '}
        <A href="https://t.me/liz_lovelace" icon="telegram.png">Telegram</A> and I’ll fix it.
      </p>
      <p><A href="/" icon={LIZ}>Go to the home page</A></p>
    </main>
  );
}
