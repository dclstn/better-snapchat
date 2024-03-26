/* snapchat overwrites default console.log */

const PREFIX = '[Better-Snapchat]';

let iframeConsole: any | null = null;

export function restoreConsoleLog() {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  iframeConsole = (iframe.contentWindow as any).console;
}

export function logInfo(...args: any[]) {
  if (document.body == null) {
    // eslint-disable-next-line no-console
    console.log(PREFIX, ...args);
    return;
  }
  if (iframeConsole == null) {
    restoreConsoleLog();
  }
  iframeConsole.log(PREFIX, ...args);
}
