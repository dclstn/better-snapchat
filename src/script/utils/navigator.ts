// TODO: Add more user agents
const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
];

function patchUserAgent() {
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  Object.defineProperty(Navigator.prototype, 'userAgent', { get: () => userAgent });
}

function patchUserMediaPermissions() {
  if (
    !('permissions' in navigator) ||
    typeof navigator.permissions.query !== 'function' ||
    !navigator.userAgent.toLowerCase().includes('firefox')
  ) {
    return;
  }

  navigator.getUserMedia = navigator.getUserMedia ?? navigator.webkitGetUserMedia ?? navigator.mozGetUserMedia;
  function userMediaPromise() {
    return new Promise((resolve) =>
      navigator.getUserMedia(
        { audio: true, video: true },
        () => resolve({ state: 'granted' }),
        () => resolve({ state: 'denied' }),
      ),
    );
  }

  navigator.permissions.query = new Proxy(navigator.permissions.query, {
    apply: async (target, thisArg, args) => {
      const [permission] = args;
      if (permission.name === 'camera' || permission.name === 'microphone') {
        return userMediaPromise();
      }
      return target.apply(thisArg, args as any);
    },
  });
}

export default function patchNavigator() {
  patchUserMediaPermissions();
  patchUserAgent();
}
