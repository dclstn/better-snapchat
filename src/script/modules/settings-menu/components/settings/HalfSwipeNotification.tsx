import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import Switch from '../Switch';
import useNotificationPermission from '../../../../hooks/useNotificationPermission';
import { LicenseContext } from '../../../../providers/ActiveLicenseProvider';
import { Button } from '@mantine/core';
import Label from '../Label';

const NAME = 'Half Swipe Notification';
const DESCRIPTION = 'Recieve a notification when a chat is half-swiped.';

function HalfSwipeNotification() {
  const [enabled, setEnabled] = useSettingState('HALF_SWIPE_NOTIFICATION');
  const verified = React.useContext(LicenseContext);

  React.useEffect(() => {
    if (enabled && !verified) {
      setEnabled(false);
    }
  }, [verified, enabled]);

  useNotificationPermission(verified && enabled);

  return (
    <Switch
      color="indigo"
      disabled={!verified && !enabled}
      label={<Label verified={verified}>{NAME}</Label>}
      description={DESCRIPTION}
      checked={enabled}
      onChange={() => setEnabled(!enabled)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: HalfSwipeNotification,
};
