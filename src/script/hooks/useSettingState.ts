import React from 'react';
import { SettingId } from '../lib/constants';
import settings from '../lib/settings';

// eslint-disable-next-line no-unused-vars
export default function useSettingState<T = boolean>(key: SettingId): [T, (value: T) => void] {
  const [value, setValue] = React.useState<T>(settings.getSetting(key) as T);

  React.useEffect(() => {
    function updateValue(newValue: T) {
      setValue(newValue);
    }
    settings.on(`${key}.setting:update`, updateValue);
    return () => {
      settings.off(`${key}.setting:update`, updateValue);
    };
  }, [key]);

  function updateSettingValue(newValue: T) {
    setValue(newValue);
    settings.setSetting(key, newValue);
  }

  return [value, updateSettingValue];
}
