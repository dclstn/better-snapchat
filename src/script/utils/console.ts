const PREFIX = '[Better-Snapchat]';

let iframeConsole: any | null = null;

export function getIframeConsole() {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  (document.head ?? document.documentElement).appendChild(iframe);
  iframeConsole = (iframe.contentWindow as any).console;
}

export function logInfo(...args: any[]) {
  if (iframeConsole == null) {
    getIframeConsole();
  }
  iframeConsole.log(PREFIX, ...args);
}

export function patchConsole() {
  window.console = new Proxy(window.console, {
    set(target, prop, receiver) {
      if (prop === 'log') {
        return true;
      }
      return Reflect.set(target, prop, receiver);
    },
  });
}
