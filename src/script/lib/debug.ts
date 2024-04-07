const PREFIX = '[Better-Snap]';

let iframeConsole: any | null = null;

export function getIframeConsole() {
  if (iframeConsole != null) {
    return iframeConsole;
  }
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  (document.head ?? document.documentElement).appendChild(iframe);
  iframeConsole = iframe.contentWindow;
  return iframeConsole;
}

export function logInfo(...args: any[]) {
  const { console } = getIframeConsole();
  console.log(PREFIX, ...args);
}
