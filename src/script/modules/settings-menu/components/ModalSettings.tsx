import React from 'react';
import Fuse from 'fuse.js';
import { Text } from '@mantine/core';
import { type SettingModule } from '../../../../types/client';
// @ts-ignore glob-import
// eslint-disable-next-line import/no-unresolved, import/extensions
import * as migrations from './settings/*.tsx';
import styles from './Modal.module.css';

const { default: settingsDefault } = migrations;
const settings = settingsDefault.map(({ default: setting }: { default: SettingModule }) => setting);

export default function ModalSettings({ search }: { search: string }) {
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
        <Text style={{ margin: 0 }}>No settings found matching &quot;{search}&quot;.</Text>
      ) : null}
      {filteredSettings.map((setting: SettingModule) => {
        const SettingComponent = setting.component;
        const settingId = Array.isArray(setting.name) ? setting.name.join('-') : setting.name;
        return <SettingComponent key={settingId} />;
      })}
    </div>
  );
}
