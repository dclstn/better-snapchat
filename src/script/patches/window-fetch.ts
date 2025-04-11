import Patch from '../lib/patch';
import settings from '../lib/settings';

const STORY_READ_RECEIPT_REGEX = /\/readreceipt-indexer\/batchuploadreadreceipts/;

class WindowFetch extends Patch {
  constructor() {
    super('WindowFetch');
  }

  patch() {
    window.fetch = new Proxy(window.fetch, {
      apply(target, thisArg, [request, ...rest]: [Request, AbortSignal]) {
        if (settings.getSetting('PREVENT_STORY_READ_RECEIPTS') && STORY_READ_RECEIPT_REGEX.test(request.url)) {
          return new Promise((resolve) => resolve(new Response(null, { status: 200 })));
        }
        return Reflect.apply(target, thisArg, [request, ...rest]);
      },
    });
  }
}

export default new WindowFetch();
