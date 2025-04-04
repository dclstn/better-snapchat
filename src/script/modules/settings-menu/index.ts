import { render, h } from 'preact';
import App from './SettingsMenu';

const APP_CONTAINER_ID = 'better-snap-app';

let appContainer: HTMLDivElement | null = null;

class SettingsMenu {
  constructor() {
    if (document.getElementById(APP_CONTAINER_ID) != null) {
      return;
    }

    appContainer = document.createElement('div');
    appContainer.setAttribute('id', APP_CONTAINER_ID);
    document.body.appendChild(appContainer);
    render(h(App, {}), appContainer);

    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    if (appContainer == null) {
      return;
    }

    const { innerWidth, innerHeight } = window;
    appContainer.style.width = `${innerWidth}px`;
    appContainer.style.height = `${innerHeight}px`;
  }
}

export default new SettingsMenu();
