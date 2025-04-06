import { logError, logInfo } from './debug';

export default class Patch {
  name: string;

  constructor(name: string) {
    this.name = name;

    try {
      this.patch();
      logInfo(`Patched: ${this.name}`);
    } catch (error) {
      logError(`Error loading patch ${this.name}:`, error);
    }
  }

  patch() {
    throw new Error('load() method must be implemented in subclass');
  }
}
