import { Checkbox, Text } from '@nextui-org/react';
import React from 'react';
import { SettingIds } from '../../../../common/constants';
import useSettingState from '../hooks/useSettingState';
import styles from './Checkbox.module.css';

export default function SaveImage() {
  const [value, setValue] = useSettingState(SettingIds.SAVE_IMAGE_BUTTON);

  return (
    <Checkbox isSelected={value} onChange={(boolean) => setValue(boolean)}>
      <div className={styles.checkboxLabel}>
        <Text size={14} css={{ margin: 0 }}>
          Save Image Button
        </Text>
        <Text size={14} color="#999" css={{ margin: 0 }}>
          Add button to silently save images to desktop.
        </Text>
      </div>
    </Checkbox>
  );
}
