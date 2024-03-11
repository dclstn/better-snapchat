import React from 'react';
import { EventTypes, SettingIds } from '../lib/constants';
import settings from '../lib/settings';

// eslint-disable-next-line no-unused-vars
export default function useSettingState(key: SettingIds): [boolean, (value: boolean) => void] {
  const [value, setValue] = React.useState(settings.getSetting(key));

  React.useEffect(() => {
    function updateValue(newValue: boolean) {
      setValue(newValue);
    }
    settings.on(`${key}.${EventTypes.SETTING_UPDATE}`, updateValue);
    return () => {
      settings.off(`${key}.${EventTypes.SETTING_UPDATE}`, updateValue);
    };
  }, [key]);

  function updateSettingValue(newValue: boolean) {
    setValue(newValue);
    settings.setSetting(key, newValue);
  }

  return [value, updateSettingValue];
}
