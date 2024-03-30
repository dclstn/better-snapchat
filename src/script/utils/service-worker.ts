export default function initalizeServiceWorker(initialSettings: any) {
  const READ_RECEIPT = 'messagingcoreservice.MessagingCoreService/UpdateConversation';
  const broadcastChannel = new BroadcastChannel('BETTER_SNAPCHAT');
  const PREVENT_READ_RECEIPTS = 'PREVENT_READ_RECEIPTS';

  let preventReadRecieptsEnabled = initialSettings[PREVENT_READ_RECEIPTS] ?? false;
  broadcastChannel.addEventListener('message', ({ data }) => {
    const { type, settings } = data;
    if (type !== 'settings:update') {
      return;
    }
    preventReadRecieptsEnabled = settings[PREVENT_READ_RECEIPTS];
  });

  // eslint-disable-next-line no-global-assign
  (fetch as Function) = new Proxy(fetch, {
    apply(target, thisArg, [request, ...rest]: [Request, AbortSignal]) {
      if (preventReadRecieptsEnabled && request.url.endsWith(READ_RECEIPT)) {
        // eslint-disable-next-line no-promise-executor-return
        return new Promise((resolve) => resolve(new Response(null, { status: 200 })));
      }
      return Reflect.apply(target, thisArg, [request, ...rest]);
    },
  });
}
