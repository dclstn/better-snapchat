import React from 'react';
import useSettingState from '../../../../hooks/useSettingState';
import { Switch } from '@mantine/core';

const NAME = 'Story View-Receipts';
const DESCRIPTION = 'Let others know you have viewed their story.';

function StoryReadReceipts() {
  const [enabled, setEnabled] = useSettingState('PREVENT_STORY_READ_RECEIPTS');
  return <Switch label={NAME} description={DESCRIPTION} checked={!enabled} onChange={() => setEnabled(!enabled)} />;
}

export default {
  name: NAME,
  description: DESCRIPTION,
  component: StoryReadReceipts,
};
