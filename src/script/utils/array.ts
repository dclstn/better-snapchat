export function compareUint8Array(canidate: Uint8Array, target: Uint8Array): boolean {
  for (let i = 0; i <= canidate.length - target.length; i++) {
    let match = true;

    for (let j = 0; j < target.length; j++) {
      if (canidate[i + j] !== target[j]) {
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
