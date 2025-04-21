import settings from '../../lib/settings';
import Module from '../../lib/module';
import styles from './index.module.css';

let attached = false;

function preventContextMenu(event: MouseEvent) {
  event.stopImmediatePropagation();
}

class MediaSaving extends Module {
  constructor() {
    super('Media Saving');
    settings.on(`SAVE_IMAGE.setting:update`, this.load);
  }

  load() {
    const enabled = settings.getSetting('SAVE_IMAGE');

    if (!attached && enabled) {
      attached = true;
      window.addEventListener('contextmenu', preventContextMenu, true);
    }

    if (attached && !enabled) {
      attached = false;
      window.removeEventListener('contextmenu', preventContextMenu, true);
    }

    document.body.classList.toggle(styles.saveImage, enabled);
  }
}

export default new MediaSaving();
