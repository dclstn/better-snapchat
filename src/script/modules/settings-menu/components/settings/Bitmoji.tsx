import React from 'react';
import { RadioGroup, Stack, Text } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { BitmojiPresence } from '../../../../lib/constants';
import styles from './Chats.module.css';
import Radio from '../Radio';

const NAME = 'Presence Settings';

const DEFAULT_NAME = 'Default';
const DEFAULT_DESCRIPTION = 'Do what Snapchat normally does.';

const HIDE_NAME = 'Invisible';
const HIDE_DESCRIPTION = 'Hide your bitmoji from chat.';

const MOBILE_NAME = 'Mobile';
const MOBILE_DESCRIPTION = 'Appear as if you are using the mobile app.';

function BitmojiSettings() {
  const [bitmojiPresence, setBitmojiPresence] = useSettingState<BitmojiPresence>('BITMOJI_PRESENCE');
  return (
    <React.Fragment>
      <Text className={styles.heading} size="xs">
        {NAME}
      </Text>
      <RadioGroup value={bitmojiPresence} onChange={(value) => setBitmojiPresence(value as BitmojiPresence)}>
        <Stack>
          <Radio value={BitmojiPresence.DEFAULT} label={DEFAULT_NAME} description={DEFAULT_DESCRIPTION} />
          <Radio value={BitmojiPresence.MOBILE} label={MOBILE_NAME} description={MOBILE_DESCRIPTION} />
          <Radio value={BitmojiPresence.HIDE} label={HIDE_NAME} description={HIDE_DESCRIPTION} />
        </Stack>
      </RadioGroup>
    </React.Fragment>
  );
}

export default {
  name: [NAME, DEFAULT_NAME, HIDE_NAME],
  description: [DEFAULT_DESCRIPTION, HIDE_DESCRIPTION],
  component: BitmojiSettings,
};
