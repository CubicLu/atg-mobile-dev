export interface Action<T> {
  type: ActionType;
  payload: T;
}

export enum ActionType {
  UPDATE_SETTINGS_PROPERTY = 'UPDATE_SETTINGS_PROPERTY',
  UPDATE_ARTIST_PROPERTY = 'UPDATE_ARTIST_PROPERTY',
  UPDATE_AUTH_PROPERTY = 'UPDATE_AUTH_PROPERTY',
  UPDATE_SETTINGS_MODAL = 'UPDATE_SETTINGS_MODAL'
}

export interface TabsInterface {
  path: string;
  icon: any;
  id: string;
  component: any;
  redirect?: boolean;
}

export interface ArtistInterface {
  cover: ArtistCoverInterface;
  name: string;
  support?: boolean;
  username: string;
  backgroundGradient?: GradientColorsInterface;
  featuredTracks?: FeaturedTrackInterface[];
  newReleases?: NewRealeseInterface[];
  events?: EventInterface[];
  radio?: RadioInterface[];
}

export interface ArtistCoverInterface {
  main: string | undefined;
  background: string | undefined;
}

export interface SettingsReducerType {
  activeTab: string;
  isPlaying: boolean;
  fanTabs: MenuInterface[];
  activeFanTab: string;
  artistTabs: MenuInterface[];
  activeArtistTab: string;
  modal: ModalSlideInterface;
}

export interface ModalSlideInterface {
  visible: boolean;
  content: React.ReactNode;
  classname?: string;
}

export interface MenuInterface {
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

export interface ArtistReducerType {
  artists: ArtistInterface[];
  currentArtist: ArtistInterface | null;
}

export interface UserInterface {
  name: string;
  email: string;
}

export interface AuthReducerType {
  loggedUser: UserInterface;
}

export interface GradientColorsInterface {
  color1: string;
  color2: string;
}

export interface FeaturedTrackInterface {
  image: string | undefined;
}

export interface NewRealeseInterface {
  image: string | undefined;
  video: string | undefined;
  time: number | string;
  title: string;
  artist: ArtistInterface;
}

export interface EventInterface {
  date: string | Date;
  where: string;
  name: string;
  city: string;
}

export interface RadioInterface {
  label: string;
  image: string | undefined;
}
