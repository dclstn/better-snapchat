// Hot Module Replacement (HMR) service worker for development.
function setupHotModuleReplacement() {
  chrome.webNavigation.onCommitted.addListener(({ url, frameId, tabId }) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'web.snapchat.com') {
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] },
      files: ['build/content.js'],
    });

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

  function initalizeWebSocket() {
    const websocket = new WebSocket(`ws://localhost:${process.env.HMR_PORT}`);

    async function reloadTabs() {
      const tabs = await chrome.tabs.query({ url: 'https://web.snapchat.com/*' });
      await Promise.all(tabs.map((tab) => (tab.id != null ? chrome.tabs.reload(tab.id) : null)));
    }

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
}

export default setupHotModuleReplacement;
