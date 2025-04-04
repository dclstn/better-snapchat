import React from 'react';
import { defaultSettingValues, SettingId } from '../lib/constants';
import settings from '../lib/settings';

// eslint-disable-next-line no-unused-vars
export default function useSettingState<T extends SettingId>(
  key: T,
): [(typeof defaultSettingValues)[T], (newValue: (typeof defaultSettingValues)[T]) => void] {
  const [value, setValue] = React.useState<(typeof defaultSettingValues)[T]>(() => {
    const initialValue = settings.getSetting(key);
    return initialValue;
  });

  React.useEffect(() => {
    function updateValue(newValue: (typeof defaultSettingValues)[T]) {
      setValue(newValue);
    }
    settings.on(`${key}.setting:update`, updateValue);
    return () => {
      settings.off(`${key}.setting:update`, updateValue);
    };
  }, [key]);

  function updateSettingValue(newValue: (typeof defaultSettingValues)[T]) {
    setValue(newValue);
    settings.setSetting(key, newValue);
  }

  return [value, updateSettingValue];
}
