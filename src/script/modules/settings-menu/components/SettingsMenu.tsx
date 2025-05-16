import React from 'react';
import { ActionIcon, Anchor, Button, FocusTrap, Input, Modal, Text } from '@mantine/core';
import Logo from './icons/BetterSnap';
import { IconSearch, IconX } from '@tabler/icons-react';
import DiscordIcon from './icons/Discord';
import Fuse from 'fuse.js';
import { type SettingModule } from '../../../../types/client';
// @ts-ignore glob-import
import * as migrations from './settings/*.tsx';
import { defaultSettingValues, ExternalUrls } from '../../../lib/constants';
import settingsManager from '../../../lib/settings';
import ThemeProvider from './ThemeProvider';
import { useDisclosure } from '@mantine/hooks';

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
    <div className="modalSettings">
      {search.length > 0 && filteredSettings.length === 0 ? (
        <Text className="emptySettings">No settings found matching &quot;{search}&quot;.</Text>
      ) : null}
      {filteredSettings.map((setting: SettingModule) => {
        const SettingComponent = setting.component;
        const settingId = Array.isArray(setting.name) ? setting.name.join('-') : setting.name;
        return <SettingComponent key={settingId} />;
      })}
      {search.length === 0 ? (
        <Anchor
          className="resetButton"
          component="button"
          onClick={() => settingsManager.setSettings(defaultSettingValues)}
        >
          Reset Settings
        </Anchor>
      ) : null}
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
    <div className="modalSection">
      <ActionIcon size="lg" className="iconButton" variant="filled" component="a" href={ExternalUrls.BUY_ME_A_COFFEE}>
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
      <ActionIcon size="md" color="gray" variant="transparent" onClick={onClose} className="closeButton">
        <IconX />
      </ActionIcon>
    </div>
  );
}

function SettingsModal({
  isOpen,
  onClose,
  portalTarget,
}: {
  isOpen: boolean;
  onClose: () => void;
  portalTarget: HTMLElement;
}) {
  const [search, setSearch] = React.useState('');
  return (
    <Modal
      withCloseButton={false}
      opened={isOpen}
      onClose={onClose}
      centered
      size="lg"
      lockScroll={false}
      portalProps={{ target: portalTarget }}
    >
      <ModalHeader onClose={onClose} search={search} setSearch={setSearch} />
      <ModalSettings search={search} />
      <div className="modalSection">
        <Button leftSection={<DiscordIcon size={18} />} variant="light" component="a" href={ExternalUrls.DISCORD}>
          Join our Discord
        </Button>
        <Text className="footerText">BetterSnap v{process.env.VERSION} ❤️</Text>
      </div>
    </Modal>
  );
}

function SettingsMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider ref={ref} getRootElement={() => ref.current!}>
      <ActionIcon size="xl" className="settingsButton" variant="filled" onClick={toggle}>
        <Logo size={18} />
      </ActionIcon>
      <SettingsModal isOpen={opened} onClose={close} portalTarget={ref.current!} />
    </ThemeProvider>
  );
}

export default SettingsMenu;
