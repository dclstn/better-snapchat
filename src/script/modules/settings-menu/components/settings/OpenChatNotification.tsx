import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';
import useNotificationPermission from '../../../../hooks/useNotificationPermission';

const NAME = 'Open Chat Notification';
const DESCRIPTION = 'This features has been patched by Snapchat.';

function OpenChatNotification() {
  return null; // currently patched by snapchat

  const [enabled, setEnabled] = useSettingState('OPEN_CHAT_NOTIFICATION');
  useNotificationPermission(enabled);

  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      // checked={enabled}
      disabled
      onChange={() => setEnabled(!enabled)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: OpenChatNotification,
};
