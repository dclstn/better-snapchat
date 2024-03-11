import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import React from 'react';
import styles from './Container.module.css';
import SettingsModal from './Modal';
import ThemeProvider from '../providers/ThemeProvider';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function ModalButton() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(false);

  return (
    <ThemeProvider>
      <div className={styles.container}>
        <Button auto onPress={() => setVisible(true)} icon={<FontAwesomeIcon icon={faGhost as IconProp} />} />
        <SettingsModal closeHandler={handler} visible={visible} />
      </div>
    </ThemeProvider>
  );
}
