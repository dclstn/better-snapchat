import React from 'react';
import { ActionIcon, Button, Modal } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import AllowScreenshot from './settings/AllowScreenshot';
import AlwaysPresent from './settings/AlwaysPresent';
import HideBitmoji from './settings/HideBitmoji';
import PreventTyping from './settings/PreventTyping';
import SaveImage from './settings/SaveImage';
import styles from './Modal.module.css';
import { ExternalUrls } from '../../../lib/constants';
import PreventTypingNotification from './settings/PreventTypingNotification';
import DiscordIcon from './icons/Discord';
import Logo from './icons/Logo';

function openExternalUrl(url: ExternalUrls) {
  window.open(url, '_blank');
}

export default function SettingsModal({
  portalTargetId,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  portalTargetId: string;
}) {
  return (
    <Modal
      withCloseButton={false}
      opened={isOpen}
      onClose={onClose}
      centered
      classNames={{ body: styles.modalBody, content: styles.modalContent }}
      portalProps={{ className: styles.portal, target: `#${portalTargetId}` }}
    >
      <div className={styles.modalSection}>
        <Button
          leftSection={<Logo size={18} />}
          color="textPrimary"
          className={styles.logo}
          variant="transparent"
          onClick={() => openExternalUrl(ExternalUrls.GITHUB)}
        >
          Better Snapchat
        </Button>
        <ActionIcon size="lg" color="gray" variant="transparent" onClick={onClose}>
          <IconX />
        </ActionIcon>
      </div>
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
          leftSection={<DiscordIcon size={18} />}
          color="indigo"
          variant="light"
          onClick={() => openExternalUrl(ExternalUrls.DISCORD)}
        >
          Join our Discord
        </Button>
        <Button onClick={onClose} variant="light" color="gray">
          Close
        </Button>
      </div>
    </Modal>
  );
}
