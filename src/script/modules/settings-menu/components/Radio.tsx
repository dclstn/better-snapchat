import React from 'react';
import { Radio as MantineRadio } from '@mantine/core';
import styles from './Radio.module.css';

function Radio(props: React.ComponentPropsWithoutRef<typeof MantineRadio>) {
  return <MantineRadio size="md" classNames={{ body: styles.body }} {...props} />;
}

export default Radio;
