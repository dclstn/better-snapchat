import React from 'react';
import { Button, Text } from '@mantine/core';
import styles from './Modal.module.css';
import openExternalUrl from '../../../utils/url';

export default function ModalFooter() {
  return (
    <div className={styles.modalSection}>
      <Button color="orange" variant="light" onClick={() => openExternalUrl('DISCORD')}>
        Buy License
      </Button>
      <Text style={{ margin: 0, marginLeft: 'auto' }}>BetterSnap v{process.env.VERSION} ❤️</Text>
    </div>
  );
}
