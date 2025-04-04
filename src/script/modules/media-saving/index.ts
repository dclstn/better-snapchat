import settings from '../../lib/settings';
import styles from './index.module.css';

let attached = false;

function preventContextMenu(event: MouseEvent) {
  event.stopImmediatePropagation();
}

class ContextMenu {
  constructor() {
    this.load();
    settings.on(`SAVE_IMAGE.setting:update`, this.load);
  }

  load() {
    const enabled = settings.getSetting('SAVE_IMAGE');
    document.body.classList.toggle(styles.saveImage, enabled);
    if (!attached && enabled) {
      attached = true;
      window.addEventListener('contextmenu', preventContextMenu, true);
    }
    if (attached && !enabled) {
      attached = false;
      window.removeEventListener('contextmenu', preventContextMenu, true);
    }
  }
}

export default new ContextMenu();
