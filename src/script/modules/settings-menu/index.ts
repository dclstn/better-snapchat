import { render, h } from 'preact';
import Module from '../../lib/module';
import { generateTagName } from '../../utils/document';
import styleText from './styles.scss';
// @ts-ignore
import mantineStyles from '@mantine/core/styles.css';
import SettingsMenuComponent from './components/SettingsMenu';

const APP_CONTAINER_ID = generateTagName();

let appContainer: ShadowDOM | null = null;

interface ShadowDOM extends HTMLElement {
  shadowRoot: ShadowRoot;
}

class AppContainer extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define(APP_CONTAINER_ID, AppContainer);

class SettingsMenu extends Module {
  constructor() {
    super('Settings Menu');
  }

  load(): void {
    if (appContainer != null) {
      return;
    }

    appContainer = document.createElement(APP_CONTAINER_ID) as ShadowDOM;
    const shadowRoot = appContainer.attachShadow({ mode: 'closed' });
    // inject mantine themes
    const mantineSheet = new CSSStyleSheet();
    mantineSheet.replaceSync(mantineStyles);
    shadowRoot.adoptedStyleSheets.push(mantineSheet);
    // inject settings menu styles
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styleText);
    shadowRoot.adoptedStyleSheets.push(sheet);

    document.documentElement.appendChild(appContainer);
    render(h(SettingsMenuComponent, {}), shadowRoot);
  }
}

export default new SettingsMenu();
