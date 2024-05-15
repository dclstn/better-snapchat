import React from 'react';
import { Button, Text } from '@mantine/core';
import styles from './Modal.module.css';
import DiscordIcon from './icons/Discord';
import openExternalUrl from '../../../utils/url';

export default function ModalFooter() {
  return (
    <div className={styles.modalSection}>
      <Button
        leftSection={<DiscordIcon size={18} />}
        color="indigo"
        variant="light"
        onClick={() => openExternalUrl('DISCORD')}
      >
        Join our Discord
      </Button>
      <Text style={{ margin: 0, marginLeft: 'auto' }}>BetterSnap v{process.env.VERSION} ❤️</Text>
    </div>
  );
}
