import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function PreventTyping() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_TYPING);
  const [hideBitmoji] = useSettingState(SettingIds.HIDE_BITMOJI);
  return (
    <Checkbox
      disabled={hideBitmoji}
      color="indigo"
      label="Prevent Typing"
      description="Prevent your Bitmoji typing animation."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default PreventTyping;
