import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Snap Viewing';
const DESCRIPTION = 'Whether to allow yourself to view snaps.';

function AllowSnapViewing() {
  const [enabled, setEnabled] = useSettingState('ALLOW_SNAP_VIEWING');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: AllowSnapViewing,
};
