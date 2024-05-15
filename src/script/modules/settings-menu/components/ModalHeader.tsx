import React from 'react';
import { ActionIcon, Input } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import styles from './Modal.module.css';
import Logo from './icons/Logo';
import openExternalUrl from '../../../utils/url';

export default function ModalHeader({
  onClose,
  search,
  setSearch,
}: {
  onClose: () => void;
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className={styles.modalSection}>
      <ActionIcon
        size="lg"
        color="indigo"
        className={styles.iconButton}
        variant="filled"
        onClick={() => openExternalUrl('BUY_ME_A_COFFEE')}
      >
        <Logo size={18} />
      </ActionIcon>
      <Input
        color="indigo"
        variant="default"
        size="xs"
        placeholder="Search settings"
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <ActionIcon size="md" color="gray" variant="transparent" onClick={onClose} className={styles.closeButton}>
        <IconX />
      </ActionIcon>
    </div>
  );
}
