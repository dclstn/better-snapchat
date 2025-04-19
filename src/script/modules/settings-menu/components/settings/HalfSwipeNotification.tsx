import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Half Swipe Notification';
const DESCRIPTION = 'Enable half swipe notifications.';

function HalfSwipeNotification() {
  const [enabled, setEnabled] = useSettingState('HALF_SWIPE_NOTIFICATION');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: HalfSwipeNotification,
};
