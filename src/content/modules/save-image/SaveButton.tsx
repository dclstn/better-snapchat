import React from 'react';
import ReactDOM from 'react-dom';
import SaveButton from './components/Button';
import settings from '../../util/settings';
import { EventTypes, SettingIds } from '../../../common/constants';
import dom from '../../observers/dom';

const CLOSE_BUTTON_SELECTOR = '[title="Close"]';

let mountedButtonNode: any = null;

class SaveImage {
  constructor() {
    this.load();
    dom.on(CLOSE_BUTTON_SELECTOR, this.load);
    settings.on(`${SettingIds.SAVE_IMAGE_BUTTON}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    if (!settings.getSetting(SettingIds.SAVE_IMAGE_BUTTON)) {
      if (mountedButtonNode != null) {
        ReactDOM.unmountComponentAtNode(mountedButtonNode);
        mountedButtonNode = null;
      }

      return;
    }

    const node: HTMLElement | null = document.querySelector(CLOSE_BUTTON_SELECTOR);
    if (node == null) {
      return;
    }

    if (mountedButtonNode != null) {
      ReactDOM.unmountComponentAtNode(mountedButtonNode);
      mountedButtonNode = null;
    }

    const imageContainer = node.parentNode as Element;
    if (imageContainer == null) {
      return;
    }

    const contentContainer = document.createElement('div');
    contentContainer.setAttribute('id', 'saveImageButton');
    imageContainer?.prepend(contentContainer);
    mountedButtonNode = contentContainer;
    ReactDOM.render(<SaveButton parentNode={imageContainer} />, contentContainer);
  }
}

export default new SaveImage();
