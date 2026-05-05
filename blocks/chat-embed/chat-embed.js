const CHAT_EMBED_URL = 'https://aem-headless-nextjs.vercel.app/chat-embed';

// Closed: just the button (80×80 at bottom-right).
// Open: expands to cover the full panel (410×548).
// postMessage from the iframe drives the resize so the rest of the EDS page
// stays fully interactive at all times.
const CLOSED = { width: '80px',  height: '80px' };
const OPEN   = { width: '410px', height: '548px' };

export default function decorate(block) {
  const iframe = document.createElement('iframe');
  iframe.src = CHAT_EMBED_URL;
  iframe.title = 'AEM Knowledge Assistant';
  iframe.setAttribute('allow', 'clipboard-write');

  Object.assign(iframe.style, {
    position: 'fixed',
    bottom: '0',
    right: '0',
    border: 'none',
    background: 'transparent',
    pointerEvents: 'auto',
    zIndex: '9999',
    ...CLOSED,
  });

  window.addEventListener('message', (e) => {
    if (e.data?.type !== 'chat-toggle') return;
    Object.assign(iframe.style, e.data.open ? OPEN : CLOSED);
  });

  document.body.appendChild(iframe);
  block.remove();
}
