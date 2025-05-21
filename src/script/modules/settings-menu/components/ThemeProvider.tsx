import React from 'react';
import {
  createTheme,
  InputWrapper,
  MantineColorSchemeManager,
  MantineProvider,
  Modal,
  Radio,
  Switch,
} from '@mantine/core';
import { getSnapchatStore } from '../../../utils/snapchat';

const store = getSnapchatStore();

let unsubscribe: (() => void) | undefined;

const mantineTheme = createTheme({
  primaryColor: 'indigo',
  cursorType: 'pointer',
  components: {
    Radio: Radio.extend({ defaultProps: { size: 'md', color: 'indigo' } }),
    Switch: Switch.extend({
      defaultProps: { size: 'md', color: 'indigo' },
      styles: () => ({
        body: { alignItems: 'center', gap: 4 },
        track: { '--switch-width': '40px' },
      }),
    }),
    InputWrapper: InputWrapper.extend({
      styles: () => ({ label: { marginBottom: 16 } }),
    }),
    Modal: Modal.extend({
      styles: () => ({
        body: { display: 'flex', flexDirection: 'column', gap: 20, padding: 20 },
        content: {
          borderRadius: 12,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'var(--mantine-color-gray-light)',
        },
      }),
    }),
  },
});

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const colorModeManager = {
  set: () => {},
  get: () => {
    const theme = store.getState().localSettings.appTheme;
    return theme === 'system' ? getSystemTheme() : theme;
  },
  subscribe: (onUpdate) => {
    unsubscribe = store.subscribe((state: any, prevState: any) => {
      if (state.localSettings.appTheme === prevState.localSettings.appTheme) {
        return;
      }

      if (state.localSettings.appTheme === 'system') {
        onUpdate(getSystemTheme());
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

function ThemeProvider({ children, ...props }: React.PropsWithChildren<React.ComponentProps<typeof MantineProvider>>) {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <MantineProvider
      defaultColorScheme="light"
      colorSchemeManager={colorModeManager}
      theme={mantineTheme}
      cssVariablesSelector=":host > main"
      withGlobalClasses={false}
      withCssVariables
      getRootElement={() => ref.current!}
      {...props}
    >
      <main ref={ref}>{children}</main>
    </MantineProvider>
  );
}

export default ThemeProvider;
