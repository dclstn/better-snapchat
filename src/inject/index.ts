// Firefox does not support enviroment world MAIN yet
// TODO: Remove this once Firefox supports enviroment world MAIN.

(() => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('build/script.js');
  document.documentElement.appendChild(script);
  script.remove();
})();
