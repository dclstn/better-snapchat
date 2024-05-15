import React from 'react';
import { SettingId } from '../lib/constants';
import settings from '../lib/settings';

// eslint-disable-next-line no-unused-vars
export default function useSettingState(key: SettingId): [boolean, (value: boolean) => void] {
  const [value, setValue] = React.useState(settings.getSetting(key));

  React.useEffect(() => {
    function updateValue(newValue: boolean) {
      setValue(newValue);
    }
    settings.on(`${key}.setting:update`, updateValue);
    return () => {
      settings.off(`${key}.setting:update`, updateValue);
    };
  }, [key]);

  function updateSettingValue(newValue: boolean) {
    setValue(newValue);
    settings.setSetting(key, newValue);
  }

  return [value, updateSettingValue];
}
