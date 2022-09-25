import { Checkbox, Text } from '@nextui-org/react';
import React from 'react';
import { SettingIds } from '../../../../common/constants';
import useSettingState from '../hooks/useSettingState';

export default function AllowScreenshot() {
  const [value, setValue] = useSettingState(SettingIds.ALLOW_SCREENSHOT);

  return (
    <Checkbox isSelected={value} onChange={(boolean) => setValue(boolean)}>
      <Text size={14}>Allow Screenshots</Text>
    </Checkbox>
  );
}
