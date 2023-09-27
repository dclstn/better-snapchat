import { EventTypes, SettingIds } from '../../../common/constants';
import dom from '../../observers/dom';
import settings from '../../lib/settings';
import styles from './styles.module.css';

const CHAT_ROOM = 'ul'; // TODO: find better selector

let mutationObserver: MutationObserver | null = null;

class AlwaysPresent {
  constructor() {
    settings.on(`${SettingIds.ALWAYS_PRESENT}.${EventTypes.SETTING_UPDATE}`, () => {
      const nodes = document.querySelectorAll(CHAT_ROOM);
      for (const node of nodes) {
        const id = node.getAttribute('id');
        if (!id?.startsWith('cv-')) {
          continue;
        }
        this.attachObserver(node);
      }
    });
    dom.on(CHAT_ROOM, (node: HTMLElement) => {
      const id = node.getAttribute('id');
      if (!id?.startsWith('cv-')) {
        return;
      }
      this.attachObserver(node);
    });
  }

  attachObserver(node: HTMLElement) {
    const enabled = settings.getSetting(SettingIds.ALWAYS_PRESENT);
    node.classList.toggle(styles.alwaysVisible, true);

    if (mutationObserver != null) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }

    if (!enabled) {
      return;
    }

    mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName !== 'aria-hidden') {
          continue;
        }
        const target = mutation.target as HTMLElement;
        const previousSibling = target.previousElementSibling as HTMLElement;
        if (previousSibling == null) {
          continue;
        }
        const shouldHide = target.getAttribute('aria-hidden') === 'true';
        previousSibling.classList.toggle(styles.hideOverlay, shouldHide);
      }
    });

    mutationObserver.observe(node, { attributeFilter: ['aria-hidden'], attributes: true });
  }
}

export default new AlwaysPresent();
