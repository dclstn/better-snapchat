import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function PreventTyping() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_TYPING);
  return (
    <Checkbox
      color="indigo"
      label="Prevent Typing"
      description="Prevent others from seeing when you are typing."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default PreventTyping;
