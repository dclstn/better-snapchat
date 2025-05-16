// Hot Module Replacement (HMR) service worker for development.
import ReconnectingWebsocket from 'reconnecting-websocket';

const PORT = process.env.HMR_PORT ?? 9292;

(() => {
  chrome.webNavigation.onCommitted.addListener(({ url, frameId, tabId }) => {
    const { hostname, pathname } = new URL(url);
    if (!['web.snapchat.com', 'www.snapchat.com'].includes(hostname)) {
      return;
    }

    if (hostname === 'www.snapchat.com' && !pathname.startsWith('/web')) {
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] },
      world: 'MAIN',
      files: ['build/script.js'],
      injectImmediately: true,
    });
  });

  async function reloadTabs() {
    const tabs = await Promise.all([
      chrome.tabs.query({ url: 'https://web.snapchat.com/*' }),
      chrome.tabs.query({ url: 'https://www.snapchat.com/web/*' }),
    ]);

    for (const { id: tabId } of tabs.flat()) {
      if (tabId == null) {
        continue;
      }

      chrome.tabs.reload(tabId);
    }
  }

  const socket = new ReconnectingWebsocket(`ws://localhost:${PORT}`, [], {
    startClosed: true,
    WebSocket: WebSocket,
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000 + Math.random() * 4000,
  });

  socket.addEventListener('message', (event) => {
    const { type } = JSON.parse(event.data);
    if (type !== 'reload') {
      return;
    }

    console.log('HMR Server reloading tabs');
    reloadTabs();
  });

  socket.addEventListener('open', () => {
    console.log('HMR Server connected');
    reloadTabs();
  });

  chrome.runtime.onInstalled.addListener(() => socket.reconnect());
  chrome.runtime.onStartup.addListener(() => socket.reconnect());
  chrome.runtime.onSuspend.addListener(() => socket.close());
  chrome.runtime.onSuspendCanceled.addListener(() => socket.reconnect());

  // keep-alive
  setInterval(chrome.runtime.getPlatformInfo, 20e3);
  console.log('HMR Server running on port:', PORT);
})();
