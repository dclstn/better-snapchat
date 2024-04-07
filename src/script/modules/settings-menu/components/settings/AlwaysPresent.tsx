import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Always Present';
const DESCRIPTION = "Disable snapchat's presence detection.";

function AlwaysPresent() {
  const [enabled, setEnabled] = useSettingState(SettingIds.ALWAYS_PRESENT);
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
  component: AlwaysPresent,
};
