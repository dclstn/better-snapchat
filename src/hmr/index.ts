// Hot Module Replacement (HMR) service worker for development.

(() => {
  chrome.webNavigation.onCommitted.addListener(({ url, frameId, tabId }) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'web.snapchat.com') {
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

  function initalizeWebSocket() {
    const websocket = new WebSocket(`ws://localhost:${process.env.HMR_PORT}`);

    websocket.addEventListener('message', async ({ data }) => {
      if (data !== 'reload') {
        return;
      }
      const tabs = await chrome.tabs.query({ url: 'https://web.snapchat.com/*' });
      for (const tab of tabs) {
        if (tab.id == null) {
          continue;
        }
        chrome.tabs.reload(tab.id);
      }
    });

    websocket.addEventListener('close', () => {
      setTimeout(initalizeWebSocket, 5000);
    });
  }

  initalizeWebSocket();
  console.log('HMR Server running on port:', process.env.HMR_PORT);
})();
