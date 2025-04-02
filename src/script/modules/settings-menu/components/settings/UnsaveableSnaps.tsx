import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';

const NAME = 'Unsaveable Messages / Snaps';
const DESCRIPTION = "Make snaps and chats you send unsaveable in chat.";

function UnsaveableSnaps() {
  const [enabled, setEnabled] = useSettingState('SEND_UNSAVEABLE');
  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={enabled}
      onChange={() => setEnabled(!enabled)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: UnsaveableSnaps,
};
