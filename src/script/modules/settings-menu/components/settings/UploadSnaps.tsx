import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'Upload Snaps';
const DESCRIPTION = "Send snaps by uploading images to chat.";

function UploadSnaps() {
  const [enabled, setEnabled] = useSettingState('UPLOAD_SNAPS');
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
  component: UploadSnaps,
};
