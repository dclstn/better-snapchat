import React from 'react';

export default function useNotificationPermission(required: boolean = true): boolean {
  const [hasPermission, setHasPermission] = React.useState(Notification.permission === 'granted');

  React.useEffect(() => {
    if (Notification.permission === 'granted' || !required) {
      return;
    }
    Notification.requestPermission()
      .then((permission) => setHasPermission(permission === 'granted'))
      .catch(() => setHasPermission(false));
  }, [required]);

  return hasPermission;
}
