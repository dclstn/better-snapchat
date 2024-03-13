/* snapchat overwrites default console.log */

const PREFIX = '[Better-Snapchat]';

export function restoreConsoleLog() {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  window.console = (iframe.contentWindow as any).console;
}

export function logInfo(...args: any[]) {
  console.log(PREFIX, ...args);
}
