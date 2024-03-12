import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import ThemeProvider from '../../providers/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import styles from './SettingsMenu.module.css';
import { Button } from '@nextui-org/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

let root: Root | null = null;

const BUTTON_CONTAINER_ID = 'better-snapchat-app';

function ModalButton() {
  return (
    <ThemeProvider>
      <Button size="lg" isIconOnly color="secondary" className={styles.iconButton}>
        <FontAwesomeIcon icon={faGhost as IconProp} />
      </Button>
    </ThemeProvider>
  );
}

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
