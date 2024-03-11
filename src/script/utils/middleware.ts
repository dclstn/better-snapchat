import { getSnapchatStore } from './snapchat';
import { v4 as uuidv4 } from 'uuid';

const store = getSnapchatStore();

type Callback = (store: any) => any;

const callbacks: Record<string, Callback> = {};

let unsubscribe: (() => void) | null = null;

export function updateSnapchatStore() {
  store.setState((prevState: any) => {
    prevState.__patched = true;
    for (const callback of Object.values(callbacks)) {
      prevState = callback(prevState);
    }
    return prevState;
  });
}

export function registerMiddleware(callback: Callback) {
  const id = uuidv4();
  callbacks[id] = callback;
  updateSnapchatStore();
}

export function patchSnapchatStore() {
  unsubscribe = store.subscribe((newState: any) => {
    if (newState.__patched) {
      return;
    }
    updateSnapchatStore();
  });
}

export function unpatchSnapchatStore() {
  if (unsubscribe != null) {
    unsubscribe();
    unsubscribe = null;
  }
}
