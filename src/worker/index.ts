import { verifyGumroadLicense } from './gumroad';
import setupHotModuleReplacement from './hmr';

(async () => {
  if (process.env.NODE_ENV === 'development') {
    setupHotModuleReplacement();
  }

  let browser: typeof chrome | undefined;
  if (typeof browser === 'undefined') {
    browser = chrome;
  }

  let verified = false;
  const { licenseKey } = await browser.storage.sync.get('licenseKey');

  if (licenseKey != null) {
    const response = await verifyGumroadLicense(licenseKey);
    if (!response.success) {
      await browser.storage.sync.remove('licenseKey');
    }

    verified = response.success;
  }

  browser.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type !== 'verifyLicense' || message.extensionId !== process.env.EXTENSION_ID) {
      return;
    }

    sendResponse({
      type: 'licenseVerification',
      data: { verified },
      world: 'service_worker',
      extensionId: process.env.EXTENSION_ID,
    });
  });
})();
