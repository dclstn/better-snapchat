import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function HideBitmoji() {
  const [enabled, setEnabled] = useSettingState(SettingIds.HIDE_BITMOJI);
  return (
    <Checkbox
      color="indigo"
      label="Hide Bitmoji"
      description="Prevent your Bitmoji from appearing in chat."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default HideBitmoji;
