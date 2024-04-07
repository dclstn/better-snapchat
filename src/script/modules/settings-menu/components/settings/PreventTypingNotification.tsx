import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Prevent Typing Notification';
const DESCRIPTION = 'Prevent typing notifications from being sent out.';

function PreventTypingNotification() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_TYPING_NOTIFICATION);
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
  component: PreventTypingNotification,
};
