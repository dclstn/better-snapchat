import React from 'react';
import { createTheme, InputWrapper, MantineProvider, Radio, Switch } from '@mantine/core';
import { getSnapchatStore } from '../utils/snapchat';
import styles from './ThemeProvider.module.css';
import switchStyles from './Switch.module.css';
import inputWrapperStyles from './InputWrapper.module.css';
import { logInfo } from '../lib/debug';

const store = getSnapchatStore();

function getAppTheme() {
  return store.getState().localSettings.appTheme;
}

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

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState();

  logInfo('ThemeProvider', theme);

  React.useEffect(() => {
    function updateTheme() {
      let appTheme = getAppTheme();
      appTheme = appTheme === 'system' ? 'auto' : appTheme;
      setTheme(appTheme);
    }
    updateTheme();
    const unsubscribe = store.subscribe(updateTheme);
    return () => unsubscribe();
  }, [setTheme]);

  return (
    <MantineProvider theme={mantineTheme} classNamesPrefix="bs-" forceColorScheme={theme} withGlobalClasses={false}>
      <main className={styles.main}>{children}</main>
    </MantineProvider>
  );
}
