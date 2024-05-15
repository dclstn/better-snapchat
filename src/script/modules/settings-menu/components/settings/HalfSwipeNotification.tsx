import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';
import useNotificationPermission from '../../../../hooks/useNotificationPermission';

const NAME = 'Half Swipe Notification';
const DESCRIPTION = 'Recieve a notification when a chat is half-swiped.';

function HalfSwipeNotification() {
  const [enabled, setEnabled] = useSettingState('HALF_SWIPE_NOTIFICATION');
  useNotificationPermission(enabled);

  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={enabled}
      onChange={() => setEnabled(!enabled)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: HalfSwipeNotification,
};
