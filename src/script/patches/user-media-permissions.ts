import Patch from '../lib/patch';

class UserMediaPermissions extends Patch {
  constructor() {
    super('User Media Permissions');
  }

  patch() {
    if (
      !('permissions' in navigator) ||
      typeof navigator.permissions.query !== 'function' ||
      !navigator.userAgent.toLowerCase().includes('firefox')
    ) {
      return;
    }

    navigator.getUserMedia = navigator.getUserMedia ?? navigator.webkitGetUserMedia ?? navigator.mozGetUserMedia;
    function userMediaPromise() {
      return new Promise((resolve) => {
        navigator.getUserMedia(
          { audio: true, video: true },
          () => resolve({ state: 'granted' }),
          () => resolve({ state: 'denied' }),
        );
      });
    }

    new Proxy(navigator.permissions.query, {
      apply: async (target, thisArg, args) => {
        const [permission] = args;
        if (permission.name === 'camera' || permission.name === 'microphone') {
          return userMediaPromise();
        }
        return target.apply(thisArg, args as any);
      },
    });
  }
}

export default new UserMediaPermissions();
