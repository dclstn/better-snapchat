import React from 'react';
import { EventTypes, SettingIds } from '../../../../common/constants';
import settings from '../../../util/settings';

export default function useSettingState(key: SettingIds): [boolean, (value: boolean) => void] {
  const [value, setValue] = React.useState(settings.getSetting(key));

  console.trace(key);

  React.useEffect(() => {
    function updateValue(value: boolean) {
      setValue(value);
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
