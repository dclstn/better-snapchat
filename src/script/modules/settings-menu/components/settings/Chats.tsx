import React from 'react';
import { Stack, Text } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import styles from './Chats.module.css';
import Radio from '../Radio';
import { SettingId } from '../../../../lib/constants';

const NAME = 'Chat Settings';

const DEFAULT_NAME = 'Default';
const DEFAULT_DESCRIPTION = 'Do what Snapchat normally does.';

const AUTO_SAVE_NAME = 'Auto-Save';
const AUTO_SAVE_DESCRIPTION = 'Automatically save chats to your history.';

const NO_READ_RECEIPTS_NAME = 'Unread';
const NO_READ_RECEIPTS_DESCRIPTION = 'Prevent others from knowing you read their chat.';

const chatSettings = ['AUTO_SAVE_CHATS', 'PREVENT_CHAT_READ_RECEIPTS'] satisfies SettingId[];
type ChatSettings = (typeof chatSettings)[number];

function Chats() {
  const [preventReadReceipts, setPreventReadReceipts] = useSettingState('PREVENT_CHAT_READ_RECEIPTS');
  const [autoSaveChats, setAutoSaveChats] = useSettingState('AUTO_SAVE_CHATS');

  function handleSettingChange(setting: ChatSettings | null) {
    setAutoSaveChats(setting === 'AUTO_SAVE_CHATS');
    setPreventReadReceipts(setting === 'PREVENT_CHAT_READ_RECEIPTS');
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
        onChange={() => handleSettingChange('AUTO_SAVE_CHATS')}
        label={AUTO_SAVE_NAME}
        description={AUTO_SAVE_DESCRIPTION}
      />
      {/* currently patched by snapchat */}
      {/* <Radio
        color="indigo"
        checked={preventReadReceipts}
        onChange={() => handleSettingChange('PREVENT_CHAT_READ_RECEIPTS')}
        description={NO_READ_RECEIPTS_DESCRIPTION}
        label={NO_READ_RECEIPTS_NAME}
      /> */}
    </Stack>
  );
}

export default {
  name: [NAME, DEFAULT_NAME, AUTO_SAVE_NAME, NO_READ_RECEIPTS_NAME],
  description: [DEFAULT_DESCRIPTION, AUTO_SAVE_DESCRIPTION, NO_READ_RECEIPTS_DESCRIPTION],
  component: Chats,
};
