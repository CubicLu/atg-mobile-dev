export interface Action<T> {
  type: ActionType;
  payload: T;
}

export enum ActionType {
  UPDATE_SETTINGS_PROPERTY = 'UPDATE_SETTINGS_PROPERTY'
}

export interface TabsInterface {
  path: string;
  icon: any;
  id: string;
  component: any;
  redirect?: boolean;
}

export interface ArtistInterface {
  cover: string | undefined;
  name: string;
  support: boolean;
}

export interface SettingsReducerType {
  activeTab: string;
  isPlaying: boolean;
  fanTabs: TabsFanInterface[];
  activeFanTab: string;
}

export interface TabsFanInterface {
  label: string;
  icon: any;
  id: string;
  component: any;
}

export interface MixtapeInterface {
  name: string;
  quantity: number;
  cover: string | undefined;
}
