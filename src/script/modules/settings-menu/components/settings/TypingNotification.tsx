import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Started Typing Notification';
const DESCRIPTION = 'Let others know when you are typing by push-notification.';

function TypingNotifcation() {
  const [enabled, setEnabled] = useSettingState('PREVENT_TYPING_NOTIFICATION');
  return <Switch label={NAME} description={DESCRIPTION} checked={!enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: TypingNotifcation,
};
