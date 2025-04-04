import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Unsaveable Messages';
const DESCRIPTION = 'Chats and snaps will be sent as unsaveable.';

function UnsaveableSnaps() {
  const [enabled, setEnabled] = useSettingState('SEND_UNSAVEABLE_MESSAGES');
  return <Switch label={NAME} description={DESCRIPTION} checked={enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: UnsaveableSnaps,
};
