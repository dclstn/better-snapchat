import EventEmitter from 'eventemitter3';

class NodeObserver {
  selectors: string[];
  eventEmitter = new EventEmitter();

  constructor() {
    this.selectors = [];

    const observer = new MutationObserver((mutations) => {
      for (const { addedNodes } of mutations) {
        if (addedNodes == null || addedNodes.length === 0) {
          continue;
        }
        for (const node of addedNodes) {
          this.queryNode(node as HTMLElement);
        }
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  }

  queryNode(element: HTMLElement) {
    for (const selector of this.selectors) {
      if (element.querySelectorAll == null) {
        continue;
      }
      for (const foundNode of element.querySelectorAll(selector)) {
        this.eventEmitter.emit(selector, foundNode);
      }
    }
  }

  on(selector: string, callback: (node: HTMLElement) => any) {
    this.selectors.push(selector);
    this.eventEmitter.on(selector, callback);
    return () => {
      this.eventEmitter.off(selector, callback);
      this.selectors = this.selectors.filter((s) => s !== selector);
    };
  }
}

export default new NodeObserver();
