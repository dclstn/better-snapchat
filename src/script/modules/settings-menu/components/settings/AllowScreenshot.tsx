import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import styles from './AllowScreenshot.module.css';
import Switch from '../Switch';

const NAME = 'Allow screenshots';
const DESCRIPTION = "Disable snapchat's screenshot prevention.";

function AllowScreenshot() {
  const [enabled, setEnabled] = useSettingState(SettingIds.ALLOW_SCREENSHOT);
  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: AllowScreenshot,
};
