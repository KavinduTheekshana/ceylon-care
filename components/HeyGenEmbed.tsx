'use client';

import { useEffect } from 'react';

export default function HeyGenEmbed() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const host = 'https://labs.heygen.com';
    const shareToken = 'eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJEZXh0ZXJfTGF3eWVyX1NpdHRpbmdfcHVibGljIiwicHJldmlld0ltZyI6Imh0dHBzOi8vZmlsZXMyLmhleWdlbi5haS9hdmF0YXIvdjMvZTIwYWMwYzkwMjE4NGZmNzkzZTc1YWU0ZTEzOWI3ZGNfNDU2MDAvcHJldmlld190YXJnZXQud2VicCIsIm5lZWRSZW1vdmVCYWNrZ3JvdW5kIjpmYWxzZSwia25vd2xlZGdlQmFzZUlkIjoiMWM0NTQ1MDYyMjZhNGRhM2JlMmM3YjM1OGFlYTVhM2EiLCJ1c2VybmFtZSI6IjVhZGRmM2NkNzk1MjQyN2M5ZTFkZjEwODA0ZTM4YWJlIn0=';
    const url = `${host}/guest/streaming-embed?share=${shareToken}&inIFrame=1`;

    const clientWidth = document.body.clientWidth;

    // Create wrapper div
    const wrapDiv = document.createElement('div');
    wrapDiv.id = 'heygen-streaming-embed';

    // Create container
    const container = document.createElement('div');
    container.id = 'heygen-streaming-container';

    // Create and inject styles
    const stylesheet = document.createElement('style');
    const expandStyles = clientWidth < 540
      ? 'height: 266px; width: 96%; left: 50%; transform: translateX(-50%);'
      : 'height: 366px; width: calc(366px * 16 / 9);';

    stylesheet.innerHTML = `
      #heygen-streaming-embed {
        z-index: 9999;
        position: fixed;
        left: 40px;
        bottom: 40px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
        transition: all linear 0.1s;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
      }
      #heygen-streaming-embed.show {
        opacity: 1;
        visibility: visible;
      }
      #heygen-streaming-embed.expand {
        ${expandStyles}
        border: 0;
        border-radius: 8px;
      }
      #heygen-streaming-container {
        width: 100%;
        height: 100%;
      }
      #heygen-streaming-container iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    `;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.allowFullscreen = false;
    iframe.title = 'Streaming Embed';
    iframe.role = 'dialog';
    iframe.allow = 'microphone';
    iframe.src = url;

    // State variables
    let visible = false;
    let initial = false;

    // Message listener
    const messageHandler = (e: MessageEvent) => {
      if (e.origin === host && e.data && e.data.type && e.data.type === 'streaming-embed') {
        if (e.data.action === 'init') {
          initial = true;
          wrapDiv.classList.toggle('show', initial);
        } else if (e.data.action === 'show') {
          visible = true;
          wrapDiv.classList.toggle('expand', visible);
        } else if (e.data.action === 'hide') {
          visible = false;
          wrapDiv.classList.toggle('expand', visible);
        }
      }
    };

    window.addEventListener('message', messageHandler);

    // Assemble and append to DOM
    container.appendChild(iframe);
    wrapDiv.appendChild(stylesheet);
    wrapDiv.appendChild(container);
    document.body.appendChild(wrapDiv);

    // Cleanup function
    return () => {
      window.removeEventListener('message', messageHandler);
      if (document.body.contains(wrapDiv)) {
        document.body.removeChild(wrapDiv);
      }
    };
  }, []);

  return null; // This component doesn't render anything directly
}
