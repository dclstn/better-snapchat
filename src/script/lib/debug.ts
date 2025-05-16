const PREFIX = '[Better-Snap]';

let iframeContentWindow: any | null = null;

export function getIframeContentWindow() {
  if (iframeContentWindow != null) {
    return iframeContentWindow;
  }

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  (document.head ?? document.documentElement).appendChild(iframe);
  iframeContentWindow = iframe.contentWindow;
  return iframeContentWindow;
}

export function logInfo(...args: unknown[]) {
  const { console } = getIframeContentWindow();
  console.log(`%c${PREFIX}`, 'color: #3b5bdb', ...args);
}

export function logWarn(...args: unknown[]) {
  const { console } = getIframeContentWindow();
  console.warn(PREFIX, ...args);
}

export function logError(...args: unknown[]) {
  const { console } = getIframeContentWindow();
  console.error(PREFIX, ...args);
}
