import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function SaveImage() {
  const [enabled, setEnabled] = useSettingState(SettingIds.SAVE_IMAGE);
  return (
    <Checkbox
      color="indigo"
      label="Right-Click Save"
      description="Silently save images when you right-click save them in chat."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default SaveImage;
