import settings from "../../lib/settings";

function checkIfPresence(arr: any) : boolean {
    const target = new Uint8Array([0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x63, 0x65]);
    
    for (let i = 0; i <= arr.length - target.length; i++) {
        let match = true;
        for (let j = 0; j < target.length; j++) {
            if (arr[i + j] !== target[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            return true;
        }
    }
    return false;
}

function modifyWebSenderPlatform(arr: any) : any {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === 0x40 && arr[i + 1] === 0x02) {
            arr[i + 1] = 0x01;
        }
    }
    return arr;
}
  

function hookSlice() {
    const originalSlice = Uint8Array.prototype.slice;
    Uint8Array.prototype.slice = function (begin, end) {
        let arr = this as Uint8Array;
        if (checkIfPresence(arr)) {
            const enabled = settings.getSetting('MOBILE_BITMOJI');
            if (enabled) {
                arr = modifyWebSenderPlatform(arr);
            }
        }
        return originalSlice.call(arr, begin, end);
    };
}


class Uint8ArraySlice {
    constructor() {
        hookSlice();
    }
}

export default new Uint8ArraySlice();