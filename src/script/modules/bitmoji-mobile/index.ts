import { BitmojiPresence } from '../../lib/constants';
import settings from '../../lib/settings';
import { compareUint8Array } from '../../utils/array';

const PRESENCE_TARGET = new Uint8Array([0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x63, 0x65]);

function modifyWebSenderPlatform(arr: any): any {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0x40 && arr[i + 1] === 0x02) {
      arr[i + 1] = 0x01;
    }
  }

  return arr;
}

function hookSlice() {
  Uint8Array.prototype.slice = new Proxy(Uint8Array.prototype.slice, {
    apply: function (target, thisArg: Uint8Array, args: any[]) {
      if (compareUint8Array(thisArg, PRESENCE_TARGET)) {
        const flag = settings.getSetting('BITMOJI_PRESENCE');
        if (flag === BitmojiPresence.MOBILE) {
          thisArg = modifyWebSenderPlatform(thisArg);
        }
      }
      return Reflect.apply(target, thisArg, args);
    },
  });
}

class BitmojiMobile {
  constructor() {
    hookSlice();
  }
}

export default new BitmojiMobile();
