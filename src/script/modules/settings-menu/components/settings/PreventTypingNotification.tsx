import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function PreventTypingNotification() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_TYPING_NOTIFICATION);
  return (
    <Checkbox
      color="indigo"
      label="Prevent Typing Notification"
      description="Prevent typing notifications from being sent out."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default PreventTypingNotification;
