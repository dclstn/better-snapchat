import '../../observers/dom';
import dom from '../../observers/dom';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalButton from './components/Button';
import SettingsModal from './components/Modal';

const CLOSE_BUTTON_SELECTOR = '[title="Close Chat"]';

let mountedButtonNode: any = null;
let mountedModalNode: any = null;

class SettingsMenu {
  constructor() {
    this.load();
    dom.on(CLOSE_BUTTON_SELECTOR, this.load);
  }

  load() {
    const node: HTMLElement | null = document.querySelector(CLOSE_BUTTON_SELECTOR);

    if (node == null) {
      return;
    }

    if (mountedButtonNode != null) {
      ReactDOM.unmountComponentAtNode(mountedButtonNode);
    }

    const buttonsContainer = node.parentNode;
    const contentContainer = document.createElement('div');
    contentContainer.setAttribute('id', 'modalOpenButton');
    buttonsContainer?.append(contentContainer);

    mountedButtonNode = contentContainer;

    ReactDOM.render(<ModalButton />, contentContainer);
  }
}

export default new SettingsMenu();
