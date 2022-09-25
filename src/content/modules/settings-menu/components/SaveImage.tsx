import { Checkbox, Text } from '@nextui-org/react';
import React from 'react';
import { SettingIds } from '../../../../common/constants';
import useSettingState from '../hooks/useSettingState';

export default function SaveImage() {
  const [value, setValue] = useSettingState(SettingIds.SAVE_IMAGE_BUTTON);

  return (
    <Checkbox isSelected={value} onChange={(boolean) => setValue(boolean)}>
      <Text size={14}>Save Image Button</Text>
    </Checkbox>
  );
}
