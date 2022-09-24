function preventPropogation(event: KeyboardEvent) {
  event.stopImmediatePropagation();
}

let listener = null;

class AllowScreenshot {
  constructor() {
    this.load();
  }

  load() {
    listener = window.addEventListener('keydown', preventPropogation, true);
  }
}

export default new AllowScreenshot();
