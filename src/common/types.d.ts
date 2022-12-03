import { PayloadNames, SettingIds } from './constants';

export interface RuntimeMessage {
  payloadName: PayloadNames;
  settingId: SettingIds;
  value: boolean;
}
