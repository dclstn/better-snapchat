import { Checkbox, Text } from '@nextui-org/react';
import React from 'react';
import { SettingIds } from '../../../../common/constants';
import useSettingState from '../hooks/useSettingState';
import styles from './Checkbox.module.css';

export default function AllowScreenshot() {
  const [value, setValue] = useSettingState(SettingIds.ALLOW_SCREENSHOT);

  return (
    <Checkbox isSelected={value} onChange={(boolean) => setValue(boolean)}>
      <div className={styles.checkboxLabel}>
        <Text size={14} css={{ margin: 0 }}>
          Allow Screenshots
        </Text>
        <Text size={14} color="#999" css={{ margin: 0 }}>
          Take screenshots of snaps and chats freely.
        </Text>
      </div>
    </Checkbox>
  );
}
