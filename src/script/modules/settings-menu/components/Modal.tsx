import React from 'react';
import { ActionIcon, Button, Divider, Modal } from '@mantine/core';
import AllowScreenshot from './settings/AllowScreenshot';
import AlwaysPresent from './settings/AlwaysPresent';
import HideBitmoji from './settings/HideBitmoji';
import PreventTyping from './settings/PreventTyping';
import SaveImage from './settings/SaveImage';
import styles from './Modal.module.css';
import {
  IconBrandDiscord,
  IconBrandDiscordFilled,
  IconCoffee,
  IconGhost2Filled,
  IconSquareRoundedXFilled,
  IconX,
} from '@tabler/icons-react';

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal withCloseButton={false} opened={isOpen} onClose={onClose} centered>
      <div className={styles.modalBody}>
        <div className={styles.modalSection}>
          <Button leftSection={<IconGhost2Filled />} color="white" className={styles.logo} variant="transparent">
            Better Snapchat
          </Button>
          <ActionIcon size="lg" color="gray" variant="light">
            <IconX />
          </ActionIcon>
        </div>
        <div className={styles.modalSettings}>
          <AllowScreenshot />
          <AlwaysPresent />
          <HideBitmoji />
          <PreventTyping />
          <SaveImage />
        </div>
        <div className={styles.modalSection}>
          <Button leftSection={<IconCoffee />} color="orange" variant="light">
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
