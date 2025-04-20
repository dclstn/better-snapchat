import { PresenceState } from './constants';

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

const PresenceStateToColor: Record<PresenceState, string> = {
  [PresenceState.TYPING]: '#38d9a9',
  [PresenceState.IDLE]: '#ff922b',
  [PresenceState.PEEKING]: '#7F00FF',
};

export function logPresence(presenceState: PresenceState, username: string, action: string) {
  const { console } = getIframeContentWindow();
  console.log(`%c[${presenceState}]`, `color: ${PresenceStateToColor[presenceState]}`, username, action);
}

export function logError(...args: unknown[]) {
  const { console } = getIframeContentWindow();
  console.error(PREFIX, ...args);
}
