import React from 'react';
import { getSnapchatStore } from '../utils/snapchat';
import { MantineProvider } from '@mantine/core';
import styles from './ThemeProvider.module.css';

const store = getSnapchatStore();

function getAppTheme() {
  return store.getState().localSettings.appTheme;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState(getAppTheme());

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
    <MantineProvider classNamesPrefix="bs-" forceColorScheme={theme} withGlobalClasses={false}>
      <main className={styles.main}>{children}</main>
    </MantineProvider>
  );
}
