import { logError, logInfo } from './debug';

interface ModuleInterface {
  name: string;
  load(): void;
}

export default class Module implements ModuleInterface {
  name: string;

  constructor(name: string) {
    this.name = name;

    try {
      this.load();
      logInfo(`Loaded: ${this.name}`);
    } catch (error) {
      logError(`Error loading module ${this.name}:`, error);
    }
  }

  load() {
    throw new Error('load() method must be implemented in subclass');
  }
}
