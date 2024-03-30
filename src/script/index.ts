/* eslint-disable import/extensions, import/no-unresolved */
import './index.css';
import { logInfo } from './utils/logger.js';
import patchNavigator from './utils/navigator.js';
import initalizeServiceWorker from './utils/service-worker';
import settings from './lib/settings';

async function onDOMContentLoaded() {
  const { attachSnapchatStoreListener } = await import('./utils/middleware.js');
  attachSnapchatStoreListener();
  logInfo('Hooked into Snapchat Store.');
  // @ts-ignore glob-import
  await import('./modules/**/index.ts');
  logInfo('Successfully loaded all modules.');
}

function injectServiceWorker() {
  const oldBlobClass = window.Blob;
  class HookedBlob extends window.Blob {
    constructor(...args: any[]) {
      const [[content]] = args;
      if (typeof content === 'string' && content.startsWith('importScripts')) {
        args[0][0] += `
          ${initalizeServiceWorker.toString()};
          ${initalizeServiceWorker.name}(${JSON.stringify(settings.getSettings())});
        `;
        window.Blob = oldBlobClass;
        logInfo('Patched Service Worker');
      }
      super(...args);
    }
  }
  window.Blob = HookedBlob;
}

(async () => {
  logInfo('Injected Script');
  injectServiceWorker();
  if (document.readyState !== 'loading') {
    onDOMContentLoaded();
  } else {
    patchNavigator();
    logInfo('Patched Navigator');
    document.addEventListener('DOMContentLoaded', onDOMContentLoaded, { once: true });
  }
})();
