import React from 'react';
import { Radio, Stack } from '@mantine/core';
import useSettingState from '../../../../hooks/useSettingState';
import { SettingsButtonLayout } from '../../../../lib/constants';

const NAME = 'Settings Button Layout';

const DEFAULT_NAME = 'Right';
const DEFAULT_DESCRIPTION = 'Show Settings button on the right side of the screen.';

const HIDDEN_NAME = 'Hidden';
const HIDDEN_DESCRIPTION = 'Hide Settings button completely.';

function _SettingsButtonLayout() {
  const [settingButtonLayout, setSettingButtonLayout] = useSettingState('SETTINGS_BUTTON_LAYOUT');
  return (
    <Radio.Group
      label={NAME}
      value={settingButtonLayout}
      onChange={(value) => setSettingButtonLayout(value as SettingsButtonLayout)}
    >
      <Stack>
        <Radio value={SettingsButtonLayout.RIGHT} label={DEFAULT_NAME} description={DEFAULT_DESCRIPTION} />
        <Radio value={SettingsButtonLayout.HIDDEN} label={HIDDEN_NAME} description={HIDDEN_DESCRIPTION} />
      </Stack>
    </Radio.Group>
  );
}

export default {
  name: [NAME, DEFAULT_NAME, HIDDEN_NAME],
  description: [DEFAULT_DESCRIPTION, HIDDEN_DESCRIPTION],
  component: _SettingsButtonLayout,
};
