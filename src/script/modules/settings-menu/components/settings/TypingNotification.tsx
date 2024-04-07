import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Started Typing Notification';
const DESCRIPTION = 'Let others know when you are typing by push-notification.';

function PreventTypingNotification() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_TYPING_NOTIFICATION);
  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={!enabled}
      onChange={() => setEnabled(!enabled)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: PreventTypingNotification,
};
