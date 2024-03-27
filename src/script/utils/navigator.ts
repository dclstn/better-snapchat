import UAParser from 'ua-parser-js';

const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15',
];

function patchUserAgent() {
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  Object.defineProperty(Navigator.prototype, 'userAgent', { get: () => userAgent });
}

function patchUserMediaPermissions() {
  if (!('permissions' in navigator) || typeof navigator.permissions.query !== 'function') {
    return;
  }

  navigator.getUserMedia = navigator.getUserMedia ?? navigator.webkitGetUserMedia ?? navigator.mozGetUserMedia;
  const userMediaPromise = new Promise((resolve) => {
    navigator.getUserMedia(
      { audio: true, video: true },
      () => resolve({ state: 'granted' }),
      () => resolve({ state: 'denied' }),
    );
  });

  navigator.permissions.query = new Proxy(navigator.permissions.query, {
    apply: async (target, thisArg, args) => {
      const [permission] = args;
      if (permission.name === 'camera' || permission.name === 'microphone') {
        return userMediaPromise;
      }
      return target.apply(thisArg, args as any);
    },
  });
}

const parser = new UAParser();
const validBrowserAgents = new Set(['Chrome', 'Safari', 'Edge']);

export default function patchBrowser() {
  const { browser } = parser.getResult();
  if (browser?.name == null || validBrowserAgents.has(browser.name)) {
    return;
  }
  patchUserAgent();
  patchUserMediaPermissions();
}
