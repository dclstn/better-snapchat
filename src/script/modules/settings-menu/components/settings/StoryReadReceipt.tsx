import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Prevent Story Read Receipts';
const DESCRIPTION = 'Prevent others from knowing you seen their story.';

function StoryReadReceipts() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_STORY_READ_RECEIPTS);
  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={enabled}
      onChange={(event) => setEnabled(event.currentTarget.checked)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: StoryReadReceipts,
};
