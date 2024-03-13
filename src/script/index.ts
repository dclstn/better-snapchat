/* eslint-disable import/extensions, import/no-unresolved */
import { logInfo, restoreConsoleLog } from './utils/logger.js';
import './index.css';

(async () => {
  const { attachSnapchatStoreListener } = await import('./utils/middleware.js');
  attachSnapchatStoreListener();
  restoreConsoleLog();
  logInfo('Patched Snapchat store.');
  // @ts-ignore glob-import
  await import('./modules/**/index.ts');
  logInfo('Successfully loaded all modules.');
})();
