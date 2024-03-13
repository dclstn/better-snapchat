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
  if (iframeConsole == null) {
    restoreConsoleLog();
    return;
  }
  iframeConsole.log(PREFIX, ...args);
}
