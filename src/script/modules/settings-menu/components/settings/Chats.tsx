import React from 'react';
import { Stack, Text } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import styles from './Chats.module.css';
import Radio from '../Radio';

const NAME = 'Chat Settings';

const DEFAULT_NAME = 'Default';
const DEFAULT_DESCRIPTION = 'Do what Snapchat normally does.';

const AUTO_SAVE_NAME = 'Auto-Save';
const AUTO_SAVE_DESCRIPTION = 'Automatically save chats to your history.';

const NO_READ_RECEIPTS_NAME = 'No Read-Receipts';
const NO_READ_RECEIPTS_DESCRIPTION = 'Prevent others from seeing you read their chat.';

enum ChatSettings {
  AUTO_SAVE_CHATS = SettingIds.AUTO_SAVE_CHATS,
  PREVENT_CHAT_READ_RECEIPTS = SettingIds.PREVENT_CHAT_READ_RECEIPTS,
}

function Chats() {
  const [preventReadReceipts, setPreventReadReceipts] = useSettingState(SettingIds.PREVENT_CHAT_READ_RECEIPTS);
  const [autoSaveChats, setAutoSaveChats] = useSettingState(SettingIds.AUTO_SAVE_CHATS);

  function handleSettingChange(setting: ChatSettings | null) {
    setAutoSaveChats(setting === ChatSettings.AUTO_SAVE_CHATS);
    setPreventReadReceipts(setting === ChatSettings.PREVENT_CHAT_READ_RECEIPTS);
  }

  return (
    <Stack>
      <Text className={styles.heading} size="xs">
        {NAME}
      </Text>
      <Radio
        color="indigo"
        checked={!autoSaveChats && !preventReadReceipts}
        onChange={() => handleSettingChange(null)}
        label={DEFAULT_NAME}
        description={DEFAULT_DESCRIPTION}
      />
      <Radio
        color="indigo"
        checked={autoSaveChats}
        onChange={() => handleSettingChange(ChatSettings.AUTO_SAVE_CHATS)}
        label={AUTO_SAVE_NAME}
        description={AUTO_SAVE_DESCRIPTION}
      />
      <Radio
        color="indigo"
        checked={preventReadReceipts}
        onChange={() => handleSettingChange(ChatSettings.PREVENT_CHAT_READ_RECEIPTS)}
        description={NO_READ_RECEIPTS_DESCRIPTION}
        label={NO_READ_RECEIPTS_NAME}
      />
    </Stack>
  );
}

export default {
  name: [NAME, DEFAULT_NAME, AUTO_SAVE_NAME, NO_READ_RECEIPTS_NAME],
  description: [DEFAULT_DESCRIPTION, AUTO_SAVE_DESCRIPTION, NO_READ_RECEIPTS_DESCRIPTION],
  component: Chats,
};
