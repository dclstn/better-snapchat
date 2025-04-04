import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Allow Screenshots';
const DESCRIPTION = "Disable snapchat's screenshot prevention.";

function AllowScreenshot() {
  const [enabled, setEnabled] = useSettingState('ALLOW_SCREENSHOT');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: AllowScreenshot,
};
