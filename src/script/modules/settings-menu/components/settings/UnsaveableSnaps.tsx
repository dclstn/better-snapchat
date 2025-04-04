import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'Unsaveable Messages / Snaps';
const DESCRIPTION = 'Messages and snaps will be sent as unsaveable.';

function UnsaveableSnaps() {
  const [enabled, setEnabled] = useSettingState('SEND_UNSAVEABLE');
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
  component: UnsaveableSnaps,
};
