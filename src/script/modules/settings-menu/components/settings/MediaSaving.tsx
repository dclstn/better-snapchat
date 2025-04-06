import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Media Saving';
const DESCRIPTION = 'Enable right-click saving of images and videos.';

function MediaSaving() {
  const [enabled, setEnabled] = useSettingState('SAVE_IMAGE');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: MediaSaving,
};
