import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function AllowScreenshot() {
  const [enabled, setEnabled] = useSettingState(SettingIds.ALLOW_SCREENSHOT);
  return (
    <Checkbox
      color="indigo"
      label="Allow screenshots"
      description="Disable snapchat's screenshot prevention."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default AllowScreenshot;
