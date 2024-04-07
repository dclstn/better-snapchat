import React from 'react';
import { Stack, Text } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import styles from './Chats.module.css';
import Radio from '../Radio';

const NAME = 'Bitmoji Settings';

const DEFAULT_NAME = 'Default';
const DEFAULT_DESCRIPTION = 'Do what Snapchat normally does..';

const HIDE_NAME = 'Hide Bitmoji';
const HIDE_DESCRIPTION = 'Prevent your Bitmoji from appearing in chat.';

function BitmojiSettings() {
  const [hideBitmoji, setHideBitmoji] = useSettingState(SettingIds.HIDE_BITMOJI);

  return (
    <Stack>
      <Text className={styles.heading} size="xs">
        {NAME}
      </Text>
      <Radio
        color="indigo"
        checked={!hideBitmoji}
        onChange={() => setHideBitmoji(false)}
        label={DEFAULT_NAME}
        description={DEFAULT_DESCRIPTION}
      />
      <Radio
        color="indigo"
        checked={hideBitmoji}
        onChange={() => setHideBitmoji(true)}
        label={HIDE_NAME}
        description={HIDE_DESCRIPTION}
      />
    </Stack>
  );
}

export default {
  name: [NAME, DEFAULT_NAME, HIDE_NAME],
  description: [DEFAULT_DESCRIPTION, HIDE_DESCRIPTION],
  component: BitmojiSettings,
};
