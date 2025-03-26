import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'Hide Bitmoji';
const DESCRIPTION = "Appear offline to everyone.";

function HideBitmoji() {
  const [enabled, setEnabled] = useSettingState('HIDE_BITMOJI');
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
  component: HideBitmoji,
};
