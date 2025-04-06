import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Multiple Snapchat Tabs';
const DESCRIPTION = 'Allow multiple tabs of Snapchat to be open at once.';

function CrossTab() {
  const [enabled, setEnabled] = useSettingState('ALLOW_CROSS_TAB');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: CrossTab,
};
