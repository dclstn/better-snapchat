import React from 'react';

export default function useTheme() {
  const [theme, setTheme] = React.useState('dark');

  React.useEffect(() => {
    const node = document.querySelector('html') as Element;

    function handleThemeMutation() {
      const theme = node.getAttribute('theme') ?? 'light';
      setTheme(theme);
    }

    handleThemeMutation();

    const observer = new MutationObserver((mutations) => {
      if (mutations.length === 0) {
        return;
      }

      handleThemeMutation();
    });

    observer.observe(node, { attributes: true, attributeFilter: ['theme'] });

    return () => {
      observer.disconnect();
    };
  }, [setTheme]);

  return [theme, setTheme];
}
