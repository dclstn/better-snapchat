import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'My AI Mentions';
const DESCRIPTION = "Whether to be able to mention @myai in chat.";

function MyAIMentions() {
  const [enabled, setEnabled] = useSettingState('MY_AI_MENTIONS');
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
  component: MyAIMentions,
};
