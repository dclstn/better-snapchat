import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'Right-Click Save';
const DESCRIPTION = 'Enable right-click saving of images and videos.';

function SaveImage() {
  const [enabled, setEnabled] = useSettingState('SAVE_IMAGE');
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
  component: SaveImage,
};
