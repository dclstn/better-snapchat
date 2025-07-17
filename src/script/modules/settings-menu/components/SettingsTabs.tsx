import React from 'react';
import { Tabs } from '@mantine/core';
import { type SettingModule } from '../../../../types/client';
interface TabConfig {
  value: string;
  label: string;
  settings: SettingModule[];
}

interface SettingsTabsProps {
  allSettings: SettingModule[];
}

const tabConfigurations: TabConfig[] = [
  {
    value: 'general',
    label: 'General',
    settings: [], // Will be filtered in the component
  },
  {
    value: 'chat-messaging',
    label: 'Chat & Messaging',
    settings: [], // Will be filtered in the component
  },
  {
    value: 'media-snaps',
    label: 'Media & Snaps',
    settings: [], // Will be filtered in the component
  },
  {
    value: 'presence-privacy',
    label: 'Presence & Privacy',
    settings: [], // Will be filtered in the component
  },
];

function SettingsTabs({ allSettings }: SettingsTabsProps) {
  const filteredTabConfigurations = React.useMemo(() => {
    return tabConfigurations.map(tabConfig => {
      let filteredSettings: SettingModule[] = [];
      switch (tabConfig.value) {
        case 'general':
          filteredSettings = allSettings.filter((setting: SettingModule) =>
            ['Always Present', 'Cross-Tab Support'].includes(Array.isArray(setting.name) ? setting.name[0] : setting.name)
          );
          break;
        case 'chat-messaging':
          filteredSettings = allSettings.filter((setting: SettingModule) =>
            ['Chat Handling', 'Send Unsaveable Messages', 'Typing Animation', 'Typing Notification'].includes(Array.isArray(setting.name) ? setting.name[0] : setting.name)
          );
          break;
        case 'media-snaps':
          filteredSettings = allSettings.filter((setting: SettingModule) =>
            ['Local Save Snaps', 'Media Saving', 'Send Snaps as Mobile', 'Screenshot Prevention', 'Unlimited File Size', 'Upload Image Snaps'].includes(Array.isArray(setting.name) ? setting.name[0] : setting.name)
          );
          break;
        case 'presence-privacy':
          filteredSettings = allSettings.filter((setting: SettingModule) =>
            ['Bitmoji Presence', 'Peeking Notification', 'Presence Logging', 'Story Read Receipt', 'View Private Stories'].includes(Array.isArray(setting.name) ? setting.name[0] : setting.name)
          );
          break;
      }
      return { ...tabConfig, settings: filteredSettings };
    });
  }, [allSettings]);

  return (
    <Tabs defaultValue="general" className="settingsTabs">
      <Tabs.List className="settingsTabList">
        {filteredTabConfigurations.map(tab => (
          <Tabs.Tab key={tab.value} value={tab.value} className="settingsTab">
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {filteredTabConfigurations.map(tab => (
        <Tabs.Panel key={tab.value} value={tab.value} className="settingsTabPanel">
          <div className="modalSettings">
            {tab.settings.map((setting: SettingModule) => {
              const SettingComponent = setting.component;
              const settingId = Array.isArray(setting.name) ? setting.name.join('-') : setting.name;
              return <SettingComponent key={settingId} />;
            })}
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export default SettingsTabs;