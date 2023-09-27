import React from 'react';
import ModalButton from './components/Button';
import dom from '../../observers/dom';
import { Root, createRoot } from 'react-dom/client';

const CLOSE_BUTTON_SELECTOR = '[title="Close Chat"]';

let root: Root | null = null;

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

    const buttonsContainer = node.parentNode;
    const contentContainer = document.createElement('div');
    contentContainer.setAttribute('id', 'modalOpenButton');
    buttonsContainer?.append(contentContainer);

    if (root != null) {
      root.unmount();
    }

    root = createRoot(contentContainer);
    root.render(<ModalButton />);
  }
}

export default new SettingsMenu();
