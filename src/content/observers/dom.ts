import EventEmitter from 'eventemitter3';

class NodeObserver extends EventEmitter {
  selectors: string[];

  constructor() {
    super();

    this.selectors = [];

    const observer = new MutationObserver((mutations) => {
      for (const { addedNodes, removedNodes } of mutations) {
        if (!addedNodes || !removedNodes || (addedNodes.length === 0 && removedNodes.length === 0)) {
          continue;
        }

        for (const node of addedNodes) {
          // @ts-ignore
          for (const selector of this.selectors) {
            const htmlNode = node as HTMLElement;

            if (htmlNode.querySelectorAll == null) {
              continue;
            }

            const foundNodes = htmlNode.querySelectorAll(selector);

            for (const foundNode of foundNodes) {
              this.emit(selector, foundNode);
            }
          }
        }
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  }

  // @ts-ignore
  on(selector: string, callback: (node: Node) => any) {
    this.selectors.push(selector);

    super.on(selector, callback);

    return () => {
      super.off(selector, callback);

      this.selectors = this.selectors.filter((_selector) => _selector != selector);
    };
  }
}

export default new NodeObserver();
