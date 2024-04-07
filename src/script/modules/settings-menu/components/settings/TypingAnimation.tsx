import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Started Typing Animation';
const DESCRIPTION = 'Let others know when you are typing.';

function PreventTyping() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_TYPING);
  const [hideBitmoji] = useSettingState(SettingIds.HIDE_BITMOJI);
  return (
    <Switch
      disabled={hideBitmoji}
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={!enabled}
      onChange={() => setEnabled(!enabled)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: PreventTyping,
};
