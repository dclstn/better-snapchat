import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function CrossTab() {
  const [enabled, setEnabled] = useSettingState(SettingIds.ALLOW_CROSS_TAB);
  return (
    <Checkbox
      color="indigo"
      label="Multiple Tabs"
      description="Allow multiple tabs to be open at once."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default CrossTab;
