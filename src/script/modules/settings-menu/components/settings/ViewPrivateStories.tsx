import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'View Private Stories';
const DESCRIPTION = "Be able to view your private stories.";

function ViewPrivateStories() {
  const [enabled, setEnabled] = useSettingState('PRIVATE_STORIES');
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
  component: ViewPrivateStories,
};
