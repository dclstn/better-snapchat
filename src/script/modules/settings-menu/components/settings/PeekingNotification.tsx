import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Peeking Notification';
const DESCRIPTION = 'Receive a notification when someone is peeking at a conversation.';

function PeekingNotification() {
  const [enabled, setEnabled] = useSettingState('HALF_SWIPE_NOTIFICATION');

  const handleOnChange = React.useCallback(
    async (enabled: boolean) => {
      if (enabled && Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }

      setEnabled(enabled);
    },
    [setEnabled],
  );

  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => handleOnChange(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: PeekingNotification,
};
