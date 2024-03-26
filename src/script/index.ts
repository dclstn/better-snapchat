/* eslint-disable import/extensions, import/no-unresolved */
import UAParser from 'ua-parser-js';
import { logInfo } from './utils/logger.js';
import './index.css';
import patchUserAgent from './utils/user-agent.js';

const parser = new UAParser();
const validBrowserAgents = new Set(['Chrome', 'Safari', 'Edge']);

(() => {
  logInfo('Injected Script');

  const browser = parser.getBrowser();
  if (browser?.name != null && !validBrowserAgents.has(browser.name)) {
    patchUserAgent();
    logInfo('Patched User Agent.');
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const { attachSnapchatStoreListener } = await import('./utils/middleware.js');
    attachSnapchatStoreListener();
    logInfo('Hooked into Snapchat Store.');

    // @ts-ignore glob-import
    await import('./modules/**/index.ts');
    logInfo('Successfully loaded all modules.');
  });
})();
