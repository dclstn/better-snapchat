import React from 'react';
import { ActionIcon, Button, Modal } from '@mantine/core';
import { IconCoffee, IconGhost2Filled, IconX } from '@tabler/icons-react';
import AllowScreenshot from './settings/AllowScreenshot';
import AlwaysPresent from './settings/AlwaysPresent';
import HideBitmoji from './settings/HideBitmoji';
import PreventTyping from './settings/PreventTyping';
import SaveImage from './settings/SaveImage';
import styles from './Modal.module.css';
import { ExternalUrls } from '../../../lib/constants';
import PreventTypingNotification from './settings/PreventTypingNotification';

function openExternalUrl(url: ExternalUrls) {
  window.open(url, '_blank');
}

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal
      withCloseButton={false}
      opened={isOpen}
      onClose={onClose}
      centered
      portalProps={{ className: styles.portal }}
    >
      <div className={styles.modalBody}>
        {/* <div className={styles.modalSection}>
          <Button
            leftSection={<IconGhost2Filled />}
            color="textPrimary"
            className={styles.logo}
            variant="transparent"
            onClick={() => openExternalUrl(ExternalUrls.GITHUB)}
          >
            Better Snapchat
          </Button>
          <ActionIcon size="lg" color="gray" variant="light" onClick={onClose}>
            <IconX />
          </ActionIcon>
        </div> */}
        <div className={styles.modalSettings}>
          <AllowScreenshot />
          <AlwaysPresent />
          <HideBitmoji />
          <PreventTyping />
          <PreventTypingNotification />
          <SaveImage />
        </div>
        <div className={styles.modalSection}>
          <Button
            leftSection={<IconCoffee />}
            color="orange"
            variant="light"
            onClick={() => openExternalUrl(ExternalUrls.BUY_ME_A_COFFEE)}
          >
            Buy me a coffee
          </Button>
          <Button onClick={onClose} variant="light" color="gray">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
