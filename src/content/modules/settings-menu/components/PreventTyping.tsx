import { Checkbox, Text } from '@nextui-org/react';
import React from 'react';
import { SettingIds } from '../../../../common/constants';
import useSettingState from '../hooks/useStorageState';

export default function PreventTypingNotification() {
  const [value, setValue] = useSettingState(SettingIds.PREVENT_TYPING_NOTIFICATION);

  return (
    <Checkbox isSelected={value} onChange={(boolean) => setValue(boolean)}>
      <Text size={14}>Prevent Typing Notification</Text>
    </Checkbox>
  );
}
