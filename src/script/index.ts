/* eslint-disable import/extensions, import/no-unresolved */
import './index.css';
import { logInfo, patchConsole } from './utils/console.js';
import patchNavigator from './utils/navigator.js';
import patchServiceWorker from './utils/service-worker';
import patchBroadcastChannel from './utils/broadcast-channel';

(async () => {
  logInfo(`Better Snapchat v${process.env.VERSION}`);

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
  logInfo('Patched Service Worker');

  patchConsole();
  logInfo('Patched Console');

  patchNavigator();
  logInfo('Patched Navigator');

  patchBroadcastChannel();
  logInfo('Patched Broadcast Channel');
})();
