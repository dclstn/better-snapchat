import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Upload Images as Snaps';
const DESCRIPTION = 'Uploaded images will be sent as snaps.';

function UploadImageSnaps() {
  const [enabled, setEnabled] = useSettingState('UPLOAD_SNAPS');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: UploadImageSnaps,
};
