import React from 'react';
import { createTheme, InputWrapper, MantineColorSchemeManager, MantineProvider, Radio, Switch } from '@mantine/core';
import { getSnapchatStore } from '../utils/snapchat';
import styles from './ThemeProvider.module.css';
import switchStyles from './Switch.module.css';
import inputWrapperStyles from './InputWrapper.module.css';

const store = getSnapchatStore();

let unsubscribe: (() => void) | undefined;

const mantineTheme = createTheme({
  primaryColor: 'indigo',
  cursorType: 'pointer',
  components: {
    Radio: Radio.extend({ defaultProps: { size: 'md' } }),
    Switch: Switch.extend({
      defaultProps: { size: 'md' },
      classNames: { body: switchStyles.body, track: switchStyles.track, trackLabel: switchStyles.track },
    }),
    InputWrapper: InputWrapper.extend({
      classNames: { label: inputWrapperStyles.label },
    }),
  },
});

const colorModeManager = {
  set: (value) => {},
  get: () => {
    const theme = store.getState().localSettings.appTheme;
    return theme === 'system' ? 'dark' : theme;
  },
  subscribe: (onUpdate) => {
    unsubscribe?.();

    unsubscribe = store.subscribe((state: any, prevState: any) => {
      if (state.localSettings.appTheme === prevState.localSettings.appTheme) {
        return;
      }

      if (state.localSettings.appTheme === 'system') {
        onUpdate('dark');
      } else {
        onUpdate(state.localSettings.appTheme);
      }
    });
  },
  unsubscribe: () => {
    unsubscribe?.();
    unsubscribe = undefined;
  },
  clear: () => {},
} satisfies MantineColorSchemeManager;

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      defaultColorScheme="light"
      colorSchemeManager={colorModeManager}
      theme={mantineTheme}
      classNamesPrefix="bs"
      withGlobalClasses={false}
    >
      <main className={styles.main}>{children}</main>
    </MantineProvider>
  );
}
