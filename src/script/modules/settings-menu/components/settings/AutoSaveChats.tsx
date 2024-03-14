import React from 'react';
import { Checkbox } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';

function AutoSaveChats() {
  const [enabled, setEnabled] = useSettingState(SettingIds.AUTO_SAVE_CHATS);
  return (
    <Checkbox
      color="indigo"
      label="Auto Save Chats"
      description="Automatically save chat messages."
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default AutoSaveChats;
