// Firefox does not support enviroment world MAIN yet
// TODO: Remove this once Firefox supports enviroment world MAIN.
function injectIntoMain() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('build/script.js');
  document.documentElement.appendChild(script);
  script.onload = () => script.remove();
}

(async () => {
  if (process.env.RUNTIME_CONTEXT === 'firefox') {
    injectIntoMain();
  }

  let browser: typeof chrome | undefined;
  if (typeof browser === 'undefined') {
    browser = chrome;
  }

  let broadcastChannel: BroadcastChannel | null = null;
  if (process.env.EXTENSION_ID != null) {
    broadcastChannel = new BroadcastChannel(process.env.EXTENSION_ID);
  }

  if (broadcastChannel == null) {
    throw new Error('BroadcastChannel is not defined');
  }

  broadcastChannel.addEventListener('message', async (event) => {
    if (event.data.world !== 'main' || browser == null || broadcastChannel == null) {
      return;
    }
    const response = await browser.runtime.sendMessage(event.data);
    if (response == null) {
      return;
    }
    broadcastChannel.postMessage(response);
  });
})();
