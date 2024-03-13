import { render, h } from 'preact';
import App from './SettingsMenu';
import styles from './SettingsMenu.module.css';

const APP_CONTAINER_ID = 'better-snapchat-app';

class SettingsMenu {
  constructor() {
    this.load();
  }

  load() {
    if (document.getElementById(APP_CONTAINER_ID) != null) {
      return;
    }
    const appContainer = document.createElement('div');
    appContainer.setAttribute('id', APP_CONTAINER_ID);
    appContainer.classList.add(styles.appContainer);
    document.body.appendChild(appContainer);
    render(h(App, {}), appContainer);
  }
}

export default new SettingsMenu();
