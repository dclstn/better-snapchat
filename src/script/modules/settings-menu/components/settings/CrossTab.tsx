import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Multiple Tabs';
const DESCRIPTION = 'Allow multiple tabs of Snapchat to be open at once.';

function CrossTab() {
  const [enabled, setEnabled] = useSettingState(SettingIds.ALLOW_CROSS_TAB);
  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: CrossTab,
};
