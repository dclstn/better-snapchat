import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Prevent Typing';
const DESCRIPTION = 'Prevent your Bitmoji typing animation.';

function PreventTyping() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_TYPING);
  const [hideBitmoji] = useSettingState(SettingIds.HIDE_BITMOJI);
  return (
    <Switch
      disabled={hideBitmoji}
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
  component: PreventTyping,
};
