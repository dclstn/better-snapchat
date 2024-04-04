import React from 'react';
import { Radio, Stack, Text } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import styles from './Chats.module.css';

function Bitmoji() {
  const [hideBitmoji, setHideBitmoji] = useSettingState(SettingIds.HIDE_BITMOJI);

  return (
    <Stack>
      <Text className={styles.heading} size="xs">
        Bitmoji Settings
      </Text>
      <Radio
        color="indigo"
        checked={!hideBitmoji}
        onChange={() => setHideBitmoji(false)}
        label="Default"
        description="Do what Snapchat normally does.."
      />
      <Radio
        color="indigo"
        checked={hideBitmoji}
        onChange={() => setHideBitmoji(true)}
        label="Hide Bitmoji"
        description="Prevent your Bitmoji from appearing in chat."
      />
    </Stack>
  );
}

export default Bitmoji;
