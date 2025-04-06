import { logInfo } from '../lib/debug';

export default class Module {
  name: string;

  constructor(name: string) {
    this.name = name;
    logInfo(`Loaded: ${this.name}`);
    this.load();
  }

  load() {
    throw new Error('load() method must be implemented in subclass');
  }
}
