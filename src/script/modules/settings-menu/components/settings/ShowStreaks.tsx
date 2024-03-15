import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function ShowStreaks() {
  const [enabled, setEnabled] = useSettingState(SettingIds.SHOW_STREAKS);
  return (
    <Checkbox
      color="indigo"
      label="Show Streaks"
      description="Show snap-streaks next to your friends' status."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default ShowStreaks;
