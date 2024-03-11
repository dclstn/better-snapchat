import { createTheme, NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { getSnapchatStore } from '../../../utils/snapchat';

const lightTheme = createTheme({ type: 'light' });
const darkTheme = createTheme({ type: 'dark' });

const store = getSnapchatStore();

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextUIProvider> & { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState(lightTheme);

  React.useEffect(() => {
    function updateTheme() {
      const isDark = store.getState().localSettings.appTheme === 'dark';
      setTheme(isDark ? darkTheme : lightTheme);
    }

    updateTheme();

    const unsubscribe = store.subscribe(updateTheme);
    return () => unsubscribe();
  }, []);

  return (
    <NextUIProvider theme={theme} disableBaseline {...props}>
      {children}
    </NextUIProvider>
  );
}
