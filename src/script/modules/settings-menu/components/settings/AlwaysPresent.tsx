import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function AlwaysPresent() {
  const [enabled, setEnabled] = useSettingState(SettingIds.ALWAYS_PRESENT);
  return (
    <Checkbox
      color="indigo"
      label="Always Present"
      description="Disable snapchat's presence detection."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default AlwaysPresent;
