document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('./build/script.js');
  (document.head ?? document.documentElement).appendChild(script);
  script.addEventListener('load', () => script.remove());
});
