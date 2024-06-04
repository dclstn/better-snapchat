import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';
import useNotificationPermission from '../../../../hooks/useNotificationPermission';
import { LicenseContext } from '../../../../providers/ActiveLicenseProvider';
import Label from '../Label';

const NAME = 'Open Chat Notification';
const DESCRIPTION = 'Recieve a notification when a chat is opened.';

function OpenChatNotification() {
  const [enabled, setEnabled] = useSettingState('OPEN_CHAT_NOTIFICATION');
  const verified = React.useContext(LicenseContext);

  useNotificationPermission(enabled);

  return (
    <Switch
      color="indigo"
      label={<Label verified={verified}>{NAME}</Label>}
      disabled={!verified && !enabled}
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
