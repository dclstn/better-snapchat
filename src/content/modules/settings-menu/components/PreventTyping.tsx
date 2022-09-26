import { Checkbox, Text } from '@nextui-org/react';
import React from 'react';
import { SettingIds } from '../../../../common/constants';
import useSettingState from '../hooks/useSettingState';
import styles from './Checkbox.module.css';

export default function PreventTypingNotification() {
  const [value, setValue] = useSettingState(SettingIds.PREVENT_TYPING_NOTIFICATION);

  return (
    <Checkbox isSelected={value} onChange={(boolean) => setValue(boolean)}>
      <div className={styles.checkboxLabel}>
        <Text size={14} css={{ margin: 0 }}>
          Prevent Typing Notification
        </Text>
        <Text size={14} color="#999" css={{ margin: 0 }}>
          Don&apos;t notify recipient when you begin typing.
        </Text>
      </div>
    </Checkbox>
  );
}
