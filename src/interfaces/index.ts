export interface Action<T> {
  type: ActionType;
  payload: T;
}

export enum ActionType {
  UPDATE_SETTINGS_PROPERTY = 'UPDATE_SETTINGS_PROPERTY',
  UPDATE_ARTIST_PROPERTY = 'UPDATE_ARTIST_PROPERTY',
  UPDATE_AUTH_PROPERTY = 'UPDATE_AUTH_PROPERTY',
  UPDATE_SETTINGS_MODAL = 'UPDATE_SETTINGS_MODAL',
  GET_ARTISTS_API = 'GET_ARTISTS_API',
  GET_ARTISTS_API_FAILURE = 'GET_ARTISTS_API_FAILURE',
  GET_ARTISTS_API_SUCCESS = 'GET_ARTISTS_API_SUCCESS',
  GET_ARTIST_API = 'GET_ARTIST_API',
  GET_ARTIST_API_FAILURE = 'GET_ARTIST_API_FAILURE',
  GET_ARTIST_API_SUCCESS = 'GET_ARTIST_API_SUCCESS'
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
  background_gradient?: GradientColorsInterface;
  featured_tracks?: FeaturedTrackInterface[];
  new_releases?: NewRealeseInterface[];
  events?: EventInterface[];
  radio?: RadioInterface[];
  support_images?: ArtistSupportImagesInterface;
  discography?: DiscographyInterface[];
  support_artist_fans?: ArtistInterface[];
  similar_artist?: ArtistInterface[];
  gallery?: GalleryInterface[];
}

export interface ArtistCoverInterface {
  main: string | undefined;
  background: string | undefined;
  event: string | undefined;
}

export interface SettingsReducerType {
  active_tab: string;
  is_playing: boolean;
  fan_tabs: MenuInterface[];
  active_fan_tab: string;
  artist_tabs: MenuInterface[];
  active_artist_tab: string;
  modal: ModalSlideInterface;
  plans: PlanInterface[];
  selected_plan: PlanInterface | null;
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
  component?: any;
  is_page?: boolean;
  route?: string | null;
  onClick?: Function;
}

export interface MixtapeInterface {
  name: string;
  quantity: number;
  cover: string | undefined;
}

export interface ArtistReducerType {
  artists: ArtistInterface[];
  current_artist: ArtistInterface | null;
  loading: boolean;
  success_message: string | null;
  error_message: string | null;
}

export interface UserInterface {
  name: string;
  email: string;
}

export interface AuthReducerType {
  logged_user: UserInterface;
}

export interface GradientColorsInterface {
  color1: string;
  color2: string;
}

export interface FeaturedTrackInterface {
  song: string;
  id: number;
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

export interface ArtistSupportImagesInterface {
  background: string | undefined;
  avatar: string | undefined;
}

export interface PlanInterface {
  price: number | string;
  name: string;
  color: Colors;
  id: string | number;
  description: string;
}

export enum Colors {
  support = 'support',
  transparentGray = 'transparent-gray',
  transparent = 'transparent',
  green = 'green',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  blue = 'blue'
}

export interface DiscographyInterface {
  cover: string | undefined;
  name: string;
}

export interface GalleryInterface {
  cover: string | undefined;
  name: string;
  items: AlbumInterface[];
}

export interface AlbumInterface {
  image: string | undefined;
}
