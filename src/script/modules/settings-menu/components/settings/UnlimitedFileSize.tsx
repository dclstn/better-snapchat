import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Unrestricted File Upload Size';
const DESCRIPTION = 'Enable sending media of any size.';

function UnlimitedFileSize() {
  const [enabled, setEnabled] = useSettingState('UNLIMITED_FILE_SIZE');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: UnlimitedFileSize,
};
