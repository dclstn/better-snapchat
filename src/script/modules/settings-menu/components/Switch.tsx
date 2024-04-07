import React from 'react';
import { Switch as MantineSwitch } from '@mantine/core';
import styles from './Switch.module.css';

function Switch(props: React.ComponentPropsWithoutRef<typeof MantineSwitch>) {
  return (
    <MantineSwitch
      size="md"
      classNames={{ track: styles.track, trackLabel: styles.track, body: styles.body }}
      {...props}
    />
  );
}

export default Switch;
