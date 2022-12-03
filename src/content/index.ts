/* eslint-disable import/extensions, import/no-unresolved */
import Logger from './lib/logger';

document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  import('./modules/**/index.ts');
  Logger.log('Modules loaded');
});
