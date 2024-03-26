// Firefox does not support enviroment world MAIN yet,
// so we need to use the background script to inject the content script
// to ensure it runs on load to patch user-agent.
// TODO: Remove this once Firefox supports enviroment world MAIN.

const scriptSrc = browser.runtime.getURL('build/script.js');

browser.webNavigation.onCommitted.addListener(({ url, frameId, tabId }) => {
  const parsedUrl = new URL(url);
  if (parsedUrl.hostname !== 'web.snapchat.com') {
    return;
  }

  browser.tabs.executeScript(tabId, {
    frameId,
    runAt: 'document_start',
    code: `
      const script = document.createElement('script');
      script.src = '${scriptSrc}';
      document.documentElement.appendChild(script);
      script.addEventListener('load', () => script.remove());
    `,
  });
});
