import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Right-Click Save';
const DESCRIPTION = 'Enable right-click saving of images and videos.';

function SaveImage() {
  const [enabled, setEnabled] = useSettingState(SettingIds.SAVE_IMAGE);
  return (
    <Switch
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
  component: SaveImage,
};
