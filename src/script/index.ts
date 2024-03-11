/* eslint-disable import/extensions, import/no-unresolved */
import Logger from './lib/logger.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { patchSnapchatStore } = await import('./utils/middleware.js');
  patchSnapchatStore();
  Logger.log('Patched Snapchat store.');
  // @ts-ignore glob-import
  await import('./modules/**/index.ts');
  Logger.log('Successfully loaded all modules.');
});
