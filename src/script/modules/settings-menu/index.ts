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
    const appContainer = document.createElement('div');
    appContainer.setAttribute('id', BUTTON_CONTAINER_ID);
    appContainer.classList.add(styles.appContainer);
    document.body.appendChild(appContainer);
    render(h(App, {}), appContainer);
  }
}

export default new SettingsMenu();
