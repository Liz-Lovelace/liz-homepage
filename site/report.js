// Sends browser errors to Liz's error inbox (report.liz-lovelace.com), like the old
// site did. At most a few per page load, and reporting itself can never throw.
const MAX_REPORTS = 3;
let sent = 0;

function report(message, error) {
  if (sent >= MAX_REPORTS) return;
  sent++;
  try {
    const stack = error?.stack ?? String(error ?? '');
    const reportString = `${message}\n\n${stack}\n\n${location.href}\n${navigator.userAgent}`;
    fetch('https://report.liz-lovelace.com/submit?channel=138', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportString, reportType: 'runtimeError' }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* never throw from the error reporter */
  }
}

export function installErrorReporting() {
  if (location.hostname !== 'liz-lovelace.com') return;
  window.addEventListener('error', (e) => report(`Uncaught exception in browser: ${e.message}`, e.error));
  window.addEventListener('unhandledrejection', (e) => report('Unhandled promise rejection in browser', e.reason));
}
