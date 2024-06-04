import React from 'react';
import { MantineProvider } from '@mantine/core';
import { getSnapchatStore } from '../utils/snapchat';
import styles from './ThemeProvider.module.css';
import ActiveLicenseProvider from './ActiveLicenseProvider';

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
    <ActiveLicenseProvider>
      <MantineProvider classNamesPrefix="bs-" forceColorScheme={theme} withGlobalClasses={false}>
        <main className={styles.main}>{children}</main>
      </MantineProvider>
    </ActiveLicenseProvider>
  );
}
