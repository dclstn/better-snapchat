/* eslint-disable import/extensions, import/no-unresolved */
import './index.css';
import { logInfo } from './utils/logger.js';
import patchNavigator from './utils/navigator.js';

async function onDOMContentLoaded() {
  const { attachSnapchatStoreListener } = await import('./utils/middleware.js');
  attachSnapchatStoreListener();
  logInfo('Hooked into Snapchat Store.');
  // @ts-ignore glob-import
  await import('./modules/**/index.ts');
  logInfo('Successfully loaded all modules.');
}

(() => {
  logInfo('Injected Script');
  if (document.readyState !== 'loading') {
    onDOMContentLoaded();
  } else {
    patchNavigator();
    document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
  }
})();
