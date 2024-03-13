import { render, h } from 'preact';
import App from './SettingsMenu';
import styles from './SettingsMenu.module.css';

const BUTTON_CONTAINER_ID = 'better-snapchat-app';

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
    buttonContainer.classList.add(styles.buttonContainer);
    document.body.appendChild(buttonContainer);
    render(h(App, {}), buttonContainer);
  }
}

export default new SettingsMenu();
