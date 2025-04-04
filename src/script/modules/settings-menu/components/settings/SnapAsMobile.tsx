import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'Snap As Mobile';
const DESCRIPTION = "Send snaps while appearing as mobile.";

function SnapAsMobile() {
  const [enabled, setEnabled] = useSettingState('SNAP_AS_MOBILE');
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
  component: SnapAsMobile,
};
