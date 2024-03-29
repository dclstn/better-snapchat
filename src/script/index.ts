/* eslint-disable import/extensions, import/no-unresolved */
import { logInfo } from './utils/logger.js';
import './index.css';
import patchNavigator from './utils/navigator.js';

(() => {
  logInfo('Injected Script');

  patchNavigator();
  logInfo('Patched Navigator.');

  document.addEventListener('DOMContentLoaded', async () => {
    const { attachSnapchatStoreListener } = await import('./utils/middleware.js');
    attachSnapchatStoreListener();
    logInfo('Hooked into Snapchat Store.');

    // @ts-ignore glob-import
    await import('./modules/**/index.ts');
    logInfo('Successfully loaded all modules.');
  });
})();
