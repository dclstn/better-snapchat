import React from 'react';
import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconGhost2Filled } from '@tabler/icons-react';
import styles from './SettingsMenu.module.css';
import ThemeProvider from '../../providers/ThemeProvider';
import SettingsModal from './components/Modal';

export default function SettingsMenu() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <ThemeProvider>
      <ActionIcon size="lg" color="indigo" className={styles.iconButton} variant="filled" onClick={open}>
        <IconGhost2Filled />
      </ActionIcon>
      <SettingsModal isOpen={opened} onClose={close} />
    </ThemeProvider>
  );
}
