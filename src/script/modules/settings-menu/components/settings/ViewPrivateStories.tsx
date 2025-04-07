import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Private Stories';
const DESCRIPTION = 'Interact with private stories on web.';

function ViewPrivateStories() {
  const [enabled, setEnabled] = useSettingState('PRIVATE_STORIES');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: ViewPrivateStories,
};
