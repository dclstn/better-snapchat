import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import ModalButton from './components/Button';
import Logger from '../../lib/logger';

let root: Root | null = null;

const BUTTON_CONTAINER_ID = 'settings-menu-button-container';

class SettingsMenu {
  constructor() {
    this.load();
  }

  load() {
    if (document.getElementById(BUTTON_CONTAINER_ID) != null) {
      return;
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('id', BUTTON_CONTAINER_ID);
    document.body.appendChild(buttonContainer);

    if (root != null) {
      root.unmount();
    }

    root = createRoot(buttonContainer);
    root.render(<ModalButton />);
  }
}

export default new SettingsMenu();
