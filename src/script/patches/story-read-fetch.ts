import Patch from '../lib/patch';
import settings from '../lib/settings';

const STORY_READ_RECEIPT_URL = 'https://web.snapchat.com/readreceipt-indexer/batchuploadreadreceipts';

class StoryReadFetch extends Patch {
  constructor() {
    super('StoryReadFetch');
  }

  patch() {
    window.fetch = new Proxy(window.fetch, {
      apply(target, thisArg, [request, ...rest]: [Request, AbortSignal]) {
        if (settings.getSetting('PREVENT_STORY_READ_RECEIPTS') && request.url?.startsWith(STORY_READ_RECEIPT_URL)) {
          return new Promise((resolve) => resolve(new Response(null, { status: 200 })));
        }
        return Reflect.apply(target, thisArg, [request, ...rest]);
      },
    });
  }
}

export default new StoryReadFetch();
