import './index.css';
import patchNavigator from './utils/navigator.js';
import patchBroadcastChannel from './utils/broadcast-channel';
import { logInfo } from './lib/debug';
import patchFetch from './utils/fetch';
import patchConsole from './utils/console';

(async () => {
  const { hostname, pathname } = new URL(location.href);
  if (!['web.snapchat.com', 'www.snapchat.com'].includes(hostname)) {
    return;
  }

  if (hostname === 'www.snapchat.com' && !pathname.startsWith('/web')) {
    return;
  }

  logInfo(`BetterSnap v${process.env.VERSION}`);

  document.addEventListener(
    'DOMContentLoaded',
    // @ts-ignore
    () => import('./modules/**/index.ts'),
    { once: true },
  );

  patchConsole();
  patchNavigator();
  patchBroadcastChannel();
  patchFetch();

  logInfo('Patched Window');
})();
