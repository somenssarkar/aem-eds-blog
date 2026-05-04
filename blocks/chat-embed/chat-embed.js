const CHAT_EMBED_URL = 'https://aem-headless-nextjs.vercel.app/chat-embed';

export default function decorate(block) {
  const iframe = document.createElement('iframe');
  iframe.src = CHAT_EMBED_URL;
  iframe.title = 'AEM Knowledge Assistant';
  iframe.setAttribute('allow', 'clipboard-write');

  // Cover full viewport — pointer-events: none passes all clicks/scrolls through to the EDS page.
  // The widget itself sets pointer-events: auto so only the chat UI is interactive.
  Object.assign(iframe.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    border: 'none',
    background: 'transparent',
    pointerEvents: 'none',
    zIndex: '9999',
  });

  // Same-origin (both served from aem-headless-nextjs.vercel.app via Vercel rewrite):
  // set pointer-events: auto on the widget root once the iframe content loads.
  iframe.addEventListener('load', () => {
    try {
      const widgetEl = iframe.contentDocument?.querySelector('[data-chat-widget]');
      if (widgetEl) widgetEl.style.pointerEvents = 'auto';
    } catch {
      // Silently ignore — cross-origin guard (should not fire in this setup)
    }
  });

  document.body.appendChild(iframe);
  block.remove();
}
