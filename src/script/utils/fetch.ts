import settings from '../lib/settings';

const STORY_READ_RECEIPT_URL = 'https://web.snapchat.com/readreceipt-indexer/batchuploadreadreceipts';

export default function patchFetch() {
  window.fetch = new Proxy(window.fetch, {
    apply(target, thisArg, [request, ...rest]: [Request, AbortSignal]) {
      if (settings.getSetting('PREVENT_STORY_READ_RECEIPTS') && request.url?.startsWith(STORY_READ_RECEIPT_URL)) {
        // eslint-disable-next-line no-promise-executor-return
        return new Promise((resolve) => resolve(new Response(null, { status: 200 })));
      }
      return Reflect.apply(target, thisArg, [request, ...rest]);
    },
  });
}
