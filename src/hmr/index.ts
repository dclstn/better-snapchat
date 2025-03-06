// Hot Module Replacement (HMR) service worker for development.

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

    chrome.scripting.insertCSS({
      target: { tabId, frameIds: [frameId] },
      files: ['build/script.css'],
    });
  });

  async function reloadTabs() {
    const tabs = await Promise.all([
      chrome.tabs.query({ url: 'https://web.snapchat.com/*' }),
      chrome.tabs.query({ url: 'https://www.snapchat.com/web/*' }),
    ]);
    for (const tab of tabs.flat()) {
      if (tab.id == null) {
        continue;
      }
      chrome.tabs.reload(tab.id);
    }
  }

  function initalizeWebSocket() {
    const websocket = new WebSocket(`ws://localhost:${process.env.HMR_PORT}`);

    websocket.addEventListener('open', () => reloadTabs());

    websocket.addEventListener('message', async ({ data }) => {
      if (data !== 'reload') {
        return;
      }
      reloadTabs();
    });

    websocket.addEventListener('close', () => {
      setTimeout(initalizeWebSocket, 5000);
    });

    websocket.addEventListener('error', () => {
      setTimeout(initalizeWebSocket, 5000);
    });
  }

  chrome.runtime.onInstalled.addListener(initalizeWebSocket);

  // keep-alive
  setInterval(chrome.runtime.getPlatformInfo, 20e3);

  // eslint-disable-next-line no-console
  console.log('HMR Server running on port:', process.env.HMR_PORT);
})();
