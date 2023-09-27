import { EventTypes, SettingIds } from '../../../common/constants';
import settings from '../../lib/settings';
import dom from '../../../content/observers/dom';
import styles from './styles.module.css';

const MEDIA_CONTENT_SELECTOR = 'div[aria-label="media content"]';

function preventContextMenu(event: MouseEvent) {
  event.stopImmediatePropagation();
}

class SaveImage {
  constructor() {
    this.load();
    settings.on(`${SettingIds.SAVE_IMAGE}.${EventTypes.SETTING_UPDATE}`, this.load);
    dom.on(MEDIA_CONTENT_SELECTOR, (node: HTMLElement) => {
      this.patchMediaContent(node);
    });
  }

  load() {
    const enabled = settings.getSetting(SettingIds.SAVE_IMAGE);

    if (enabled) {
      window.addEventListener('contextmenu', preventContextMenu, true);
      const mediaContent = document.querySelectorAll(MEDIA_CONTENT_SELECTOR);
      for (const node of mediaContent) {
        this.patchMediaContent(node as HTMLElement);
      }
    }

    if (!enabled) {
      window.removeEventListener('contextmenu', preventContextMenu, true);
      const mediaContent = document.querySelectorAll(MEDIA_CONTENT_SELECTOR);
      for (const node of mediaContent) {
        this.patchMediaContent(node as HTMLElement);
      }
    }
  }

  patchMediaContent(node: HTMLElement) {
    const enabled = settings.getSetting(SettingIds.SAVE_IMAGE);
    node.classList.toggle(styles.patchedMediaContent, enabled);
  }
}

export default new SaveImage();
