import './index.css';
import patchNavigator from './utils/navigator.js';
import patchServiceWorker from './utils/service-worker';
import patchBroadcastChannel from './utils/broadcast-channel';
import { logInfo } from './lib/debug';
import patchFetch from './utils/fetch';
import patchConsole from './utils/console';

(async () => {
  logInfo(`BetterSnap v${process.env.VERSION}`);

  document.addEventListener(
    'DOMContentLoaded',
    async () => {
      const { attachSnapchatStoreListener } = await import('./utils/middleware.js');
      attachSnapchatStoreListener();
      logInfo('Hooked into Snapchat Store.');
      // @ts-ignore glob-import
      await import('./modules/**/index.ts');
      logInfo('Successfully loaded all modules.');
    },
    { once: true },
  );

  patchServiceWorker();
  patchConsole();
  patchNavigator();
  patchBroadcastChannel();
  patchFetch();

  logInfo('Patched Window');
})();
