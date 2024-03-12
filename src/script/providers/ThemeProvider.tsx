import React from 'react';
import { getSnapchatStore } from '../utils/snapchat';
import { NextUIProvider } from '@nextui-org/react';
import Logger from '../lib/logger';

const store = getSnapchatStore();

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  //   const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    function updateTheme() {
      const isDark = store.getState().localSettings.appTheme === 'dark';
      Logger.log(isDark);
      //   setTheme(isDark ? 'dark' : 'light');
    }

    updateTheme();

    const unsubscribe = store.subscribe(updateTheme);
    return () => unsubscribe();
  }, []);

  return (
    <NextUIProvider className="bs-preflight">
      <main className="dark">{children}</main>
    </NextUIProvider>
  );
}
