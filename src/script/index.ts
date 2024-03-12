/* eslint-disable import/extensions, import/no-unresolved */
import Logger from './lib/logger.js';
import './index.css';

document.addEventListener('DOMContentLoaded', async () => {
  const { attachSnapchatStoreListener } = await import('./utils/middleware.js');
  attachSnapchatStoreListener();
  Logger.log('Patched Snapchat store.');
  // @ts-ignore glob-import
  await import('./modules/**/index.ts');
  Logger.log('Successfully loaded all modules.');
});
