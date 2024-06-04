import React, { useContext } from 'react';
import { Stack, Text } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingId } from '../../../../lib/constants';
import styles from './Chats.module.css';
import Radio from '../Radio';
import Label from '../Label';
import { LicenseContext } from '../../../../providers/ActiveLicenseProvider';

const NAME = 'Bitmoji Settings';

const DEFAULT_NAME = 'Default';
const DEFAULT_DESCRIPTION = 'Do what Snapchat normally does.';

const MOBILE_NAME = 'Mobile';
const MOBILE_DESCRIPTION = 'Appear to be on mobile.';

const HIDE_NAME = 'Invisible';
const HIDE_DESCRIPTION = 'Prevent your Bitmoji from appearing in chat.';

function BitmojiSettings() {
  const [hideBitmoji, setHideBitmoji] = useSettingState('HIDE_BITMOJI');
  const [mobileBitmoji, setMobileBitmoji] = useSettingState('MOBILE_BITMOJI');
  const verified = useContext(LicenseContext);

  function handleSettingsChange(setting: SettingId | null) {
    setHideBitmoji(setting === 'HIDE_BITMOJI');
    setMobileBitmoji(setting === 'MOBILE_BITMOJI');
  }

  return (
    <Stack>
      <Text className={styles.heading} size="xs">
        {NAME}
      </Text>
      <Radio
        color="indigo"
        checked={!mobileBitmoji && !hideBitmoji}
        onChange={() => handleSettingsChange(null)}
        label={DEFAULT_NAME}
        description={DEFAULT_DESCRIPTION}
      />
      <Radio
        color="indigo"
        checked={mobileBitmoji}
        disabled={!verified}
        onChange={() => handleSettingsChange('MOBILE_BITMOJI')}
        label={<Label verified={verified}>{MOBILE_NAME}</Label>}
        description={MOBILE_DESCRIPTION}
      />
      <Radio
        color="indigo"
        checked={hideBitmoji}
        onChange={() => handleSettingsChange('HIDE_BITMOJI')}
        label={HIDE_NAME}
        description={HIDE_DESCRIPTION}
      />
    </Stack>
  );
}

export default {
  name: [NAME, DEFAULT_NAME, HIDE_NAME, MOBILE_NAME],
  description: [DEFAULT_DESCRIPTION, HIDE_DESCRIPTION, MOBILE_DESCRIPTION],
  component: BitmojiSettings,
};
