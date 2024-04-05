import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function StoryReadReceipts() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_STORY_READ_RECEIPTS);
  return (
    <Checkbox
      color="indigo"
      label="Prevent Story Read Receipts"
      description="Prevent others from knowing you seen their story."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default StoryReadReceipts;
