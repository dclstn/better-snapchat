import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'Always Present';
const DESCRIPTION = "Disable snapchat's presence detection.";

function AlwaysPresent() {
  const [enabled, setEnabled] = useSettingState('ALWAYS_PRESENT');
  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={enabled}
      onChange={() => setEnabled(!enabled)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: AlwaysPresent,
};
