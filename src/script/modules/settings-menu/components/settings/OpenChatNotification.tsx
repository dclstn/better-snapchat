import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';
import useNotificationPermission from '../../../../hooks/useNotificationPermission';

const NAME = 'Open Chat Notification';
const DESCRIPTION = 'Recieve a notification when a chat is opened.';

function OpenChatNotification() {
  const [enabled, setEnabled] = useSettingState('OPEN_CHAT_NOTIFICATION');
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
  component: OpenChatNotification,
};
