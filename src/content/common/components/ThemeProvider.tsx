import { createTheme, NextUIProvider } from '@nextui-org/react';
import React from 'react';
import useTheme from '../hooks/useTheme';

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});

export default function ThemeProvider({ children, ...props }: any) {
  const [theme] = useTheme();

  return (
    <NextUIProvider {...props} theme={theme === 'dark' ? darkTheme : lightTheme} disableBaseline>
      {children}
    </NextUIProvider>
  );
}
