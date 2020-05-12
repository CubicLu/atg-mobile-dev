import { RadioSection } from '../../types';

export interface RadioInterface {
  readonly label: string;
  readonly image: string | undefined;
}

export interface ChannelInterface {
  readonly id: string;
  readonly type: RadioSection;
  readonly name: string;
  readonly icon?: string;
  readonly image?: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly color: string;
  readonly target?: string;
  readonly tags?: string[];
  readonly similarStations?: string[];
}
export interface StationInterface {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly tags?: string[];
  readonly genre: 'Blues' | 'Funk' | 'Jazz' | 'Soul' | 'Reggae' | 'Country';
}
