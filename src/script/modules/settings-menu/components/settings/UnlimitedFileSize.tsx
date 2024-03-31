import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function UnlimitedFileSize() {
  const [enabled, setEnabled] = useSettingState(SettingIds.UNLIMITED_FILE_SIZE);
  return (
    <Checkbox
      color="indigo"
      label="Unlimited File Size"
      description="Enable sending files of any size."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default UnlimitedFileSize;
