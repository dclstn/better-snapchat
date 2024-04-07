export interface SettingModule {
  name: string | string[];
  description: string | string[];
  component: React.FC;
}
