import { Checkbox, Text } from '@nextui-org/react';
import React from 'react';
import { SettingIds } from '../../../lib/constants';
import useSettingState from '../../../hooks/useSettingState';
import styles from './Checkbox.module.css';

export default function SaveImage() {
  const [value, setValue] = useSettingState(SettingIds.SAVE_IMAGE);

  return (
    <Checkbox isSelected={value} onChange={(boolean) => setValue(boolean)}>
      <div className={styles.checkboxLabel}>
        <Text size={14} css={{ margin: 0 }}>
          Allow Save Image
        </Text>
        <Text size={14} color="#999" css={{ margin: 0 }}>
          Prevent media blurring and allow right-click save on image and videos.
        </Text>
      </div>
    </Checkbox>
  );
}
