import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'Ads Enabled';
const DESCRIPTION = "Whether to have annoying ads enabled.";

function AdsEnabled() {
  return null;
  
  const [enabled, setEnabled] = useSettingState('ADS_ENABLED');
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
  component: AdsEnabled,
};
