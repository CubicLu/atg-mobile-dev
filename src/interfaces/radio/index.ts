import { RadioSection } from "../../types";

export interface RadioInterface {
    label: string;
    image: string | undefined;
  }
  
  export interface ChannelInterface {
    id: string;
    type: RadioSection;
    name: string;
    icon?: string;
    image?: string;
    title?: string;
    subtitle?: string;
    color: string;
    target?: string;
    tags?: string[];
    similarStations?: string[];
  }
  export interface StationInterface {
    id: string;
    name: string;
    image: string;
    tags?: string[];
    genre: 'Blues' | 'Funk' | 'Jazz' | 'Soul' | 'Reggae' | 'Country';
  }