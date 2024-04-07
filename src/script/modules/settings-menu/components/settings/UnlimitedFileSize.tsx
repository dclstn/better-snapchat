import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Unlimited File Upload Size';
const DESCRIPTION = 'Enable sending files of any size.';

function UnlimitedFileSize() {
  const [enabled, setEnabled] = useSettingState(SettingIds.UNLIMITED_FILE_SIZE);
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
  component: UnlimitedFileSize,
};
