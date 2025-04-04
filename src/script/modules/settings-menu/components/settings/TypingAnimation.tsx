import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Started Typing Animation';
const DESCRIPTION = 'Let others know when you are typing.';

function TypingAnimation() {
  const [enabled, setEnabled] = useSettingState('PREVENT_TYPING');
  const [hideBitmoji] = useSettingState('HIDE_BITMOJI');
  return (
    <Switch
      disabled={hideBitmoji}
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
  component: TypingAnimation,
};
