import settings from '../../lib/settings';
import Module from '../../lib/module';
import styles from './index.scss';

let attached = false;

function preventContextMenu(event: MouseEvent) {
  event.stopImmediatePropagation();
}

let styleElement: HTMLStyleElement | null = null;

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

    if (styleElement != null && !enabled) {
      styleElement.remove();
      styleElement = null;
    }

    if (styleElement == null && enabled) {
      styleElement = document.createElement('style');
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }
  }
}

export default new MediaSaving();
