import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Presence Logging';
const DESCRIPTION = 'Log presence changes to the dev-console.';

function PresenceLogging() {
  const [enabled, setEnabled] = useSettingState('PRESENCE_LOGGING');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: PresenceLogging,
};
