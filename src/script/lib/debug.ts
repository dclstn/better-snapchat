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

export enum PresenceState {
  TYPING = 'TYPING',
  STOPPED = 'STOPPED TYPING',
  PEEKING = 'PEEKING',
  PRESENT = 'PRESENT IN CHAT',
}

export function logPresence(presenceState: PresenceState, user: any) {
  const { console } = getIframeContentWindow();
  console.log(`%c[${presenceState}]`, 'color: yellow', user.username, user.user_id);
}

export function logError(...args: unknown[]) {
  const { console } = getIframeContentWindow();
  console.error(PREFIX, ...args);
}
