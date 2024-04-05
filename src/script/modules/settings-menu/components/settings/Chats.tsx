import React from 'react';
import { Radio, Stack, Text } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import styles from './Chats.module.css';

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
        Chat Settings
      </Text>
      <Radio
        color="indigo"
        checked={!autoSaveChats && !preventReadReceipts}
        onChange={() => handleSettingChange(null)}
        label="Default"
        description="Do what Snapchat normally does."
      />
      <Radio
        color="indigo"
        checked={autoSaveChats}
        onChange={() => handleSettingChange(ChatSettings.AUTO_SAVE_CHATS)}
        label="Auto-Save"
        description="Automatically save chats to your history."
      />
      <Radio
        color="indigo"
        checked={preventReadReceipts}
        onChange={() => handleSettingChange(ChatSettings.PREVENT_CHAT_READ_RECEIPTS)}
        description="Prevent others from seeing you read their chat."
        label="No Read-Receipts"
      />
    </Stack>
  );
}

export default Chats;
