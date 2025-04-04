import React from 'react';
import { ActionIcon, Button, FocusTrap, Input, Modal, Text } from '@mantine/core';
import styles from './Modal.module.css';
import Logo from './icons/BetterSnap';
import { IconSearch, IconX } from '@tabler/icons-react';
import DiscordIcon from './icons/Discord';
import Fuse from 'fuse.js';
import { type SettingModule } from '../../../../types/client';
// @ts-ignore glob-import
import * as migrations from './settings/*.tsx';
import { ExternalUrls } from '../../../lib/constants';

const { default: settingsDefault } = migrations;
const settings = settingsDefault.map(({ default: setting }: { default: SettingModule }) => setting);

function ModalSettings({ search }: { search: string }) {
  const fuse = React.useMemo(() => new Fuse(settings, { keys: ['name', 'description'] }), []);

  const filteredSettings = React.useMemo(() => {
    if (search.length > 0) {
      return fuse.search(search).map((result) => result.item);
    }
    return settings;
  }, [search, fuse]);

  return (
    <div className={styles.modalSettings}>
      {search.length > 0 && filteredSettings.length === 0 ? (
        <Text className={styles.emptySettings}>No settings found matching &quot;{search}&quot;.</Text>
      ) : null}
      {filteredSettings.map((setting: SettingModule) => {
        const SettingComponent = setting.component;
        const settingId = Array.isArray(setting.name) ? setting.name.join('-') : setting.name;
        return <SettingComponent key={settingId} />;
      })}
    </div>
  );
}

function ModalHeader({
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
        className={styles.iconButton}
        variant="filled"
        component="a"
        href={ExternalUrls.BUY_ME_A_COFFEE}
      >
        <Logo size={18} />
      </ActionIcon>
      <FocusTrap active>
        <Input
          variant="default"
          size="xs"
          autoFocus
          placeholder="Search settings"
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </FocusTrap>
      <ActionIcon size="md" color="gray" variant="transparent" onClick={onClose} className={styles.closeButton}>
        <IconX />
      </ActionIcon>
    </div>
  );
}

function SettingsModal({
  portalTargetId,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  portalTargetId: string;
}) {
  const [search, setSearch] = React.useState('');
  return (
    <Modal
      withCloseButton={false}
      opened={isOpen}
      onClose={onClose}
      centered
      size="lg"
      classNames={{ body: styles.modalBody, content: styles.modalContent }}
      portalProps={{ className: styles.portal, target: `#${portalTargetId}` }}
    >
      <ModalHeader onClose={onClose} search={search} setSearch={setSearch} />
      <ModalSettings search={search} />
      <div className={styles.modalSection}>
        <Button leftSection={<DiscordIcon size={18} />} variant="light" component="a" href={ExternalUrls.DISCORD}>
          Join our Discord
        </Button>
        <Text className={styles.footerText}>BetterSnap v{process.env.VERSION} ❤️</Text>
      </div>
    </Modal>
  );
}

export default SettingsModal;
