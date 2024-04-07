import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingIds } from '../../../../lib/constants';
import Switch from '../Switch';

const NAME = 'Viewed Story';
const DESCRIPTION = 'Let others know when you have viewed their story.';

function StoryReadReceipts() {
  const [enabled, setEnabled] = useSettingState(SettingIds.PREVENT_STORY_READ_RECEIPTS);
  return (
    <Switch
      color="indigo"
      label={NAME}
      description={DESCRIPTION}
      checked={!enabled}
      onChange={() => setEnabled(!enabled)}
    />
  );
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: StoryReadReceipts,
};
