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
  GET_ARTIST_API_SUCCESS = 'GET_ARTIST_API_SUCCESS',
  GET_ARTIST_EVENT_API = 'GET_ARTIST_EVENT_API',
  GET_ARTIST_EVENT_API_FAILURE = 'GET_ARTIST_EVENT_API_FAILURE',
  GET_ARTIST_EVENT_API_SUCCESS = 'GET_ARTIST_EVENT_API_SUCCESS',
  UPDATE_ARTIST_SET_INITIAL_PROPERTY = 'UPDATE_ARTIST_SET_INITIAL_PROPERTY',
  TOGGLE_PLAYER = 'TOGGLE_PLAYER',
  PLAY_SONG = 'PLAY_SONG',
  NEXT_SONG = 'NEXT_SONG',
  PREV_SONG = 'PREV_SONG',
  STOP_SONG = 'STOP_SONG',
  PAUSE_SONG = 'PAUSE_SONG',
  RESUME_SONG = 'RESUME_SONG',
  UPDATE_ELAPSED_SONG = 'UPDATE_ELAPSED_SONG',
  FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS',
  TOGGLE_SHUFFLE_PLAYER = 'TOGGLE_SHUFFLE_PLAYER',
  TOGGLE_REPEAT_PLAYER = 'TOGGLE_REPEAT_PLAYER',
  FAVORITE_SONG = 'FAVORITE_SONG',
  SET_PLAYLIST_PLAYER = 'SET_PLAYLIST_PLAYER',
  SET_RADIO_PLAYER = 'SET_RADIO_PLAYER',
  GET_COMMUNITY_POSTS_API = 'GET_COMMUNITY_POSTS_API',
  GET_COMMUNITY_POSTS_API_FAILURE = 'GET_COMMUNITY_POSTS_API_FAILURE',
  GET_COMMUNITY_POSTS_API_SUCCESS = 'GET_COMMUNITY_POSTS_API_SUCCESS',
  UPDATE_COMMUNITY_SET_INITIAL_PROPERTY = 'UPDATE_COMMUNITY_SET_INITIAL_PROPERTY',
  UPDATE_COMMUNITY_PROPERTY = 'UPDATE_COMMUNITY_PROPERTY',
  GET_COMMUNITY_BY_ARTIST_USERNAME_API = 'GET_COMMUNITY_BY_ARTIST_USERNAME_API',
  GET_COMMUNITY_BY_ARTIST_USERNAME_API_FAILURE = 'GET_COMMUNITY_BY_ARTIST_USERNAME_API_FAILURE',
  GET_COMMUNITY_BY_ARTIST_USERNAME_API_SUCCESS = 'GET_COMMUNITY_BY_ARTIST_USERNAME_API_SUCCESS',
  GET_COMMUNITY_STORIES_API = 'GET_COMMUNITY_STORIES_API',
  GET_COMMUNITY_STORIES_API_FAILURE = 'GET_COMMUNITY_STORIES_API_FAILURE',
  GET_COMMUNITY_STORIES_API_SUCCESS = 'GET_COMMUNITY_STORIES_API_SUCCESS'
}

export interface TabsInterface {
  path: string;
  icon: any;
  id: string;
  component: any;
}
export interface LinksInterface {
  path: string;
  icon?: any;
  id: string;
  component?: any;
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
  supportImages?: ArtistSupportImagesInterface;
  discography?: DiscographyInterface[];
  supportArtistFans?: ArtistInterface[];
  similarArtist?: ArtistInterface[];
  gallery?: GalleryInterface[];
  biography?: BiographyInterface[];
}

export interface ArtistCoverInterface {
  main: string | undefined;
  background: string | undefined;
  event: string | undefined;
  biography: string | undefined;
  deepDive: string | undefined;
}

export interface SettingsReducerType {
  activeTab: string;
  tabs: TabsInterface[];
  links: LinksInterface[];
  isPlaying: boolean;
  fanTabs: MenuInterface[];
  activeFanTab: string;
  artistTabs: MenuInterface[];
  activeArtistTab: string;
  modal: ModalSlideInterface;
  plans: PlanInterface[];
  selectedPlan: PlanInterface | null;
  activeDeepDiveTab: string;
  deepDiveTabs: MenuInterface[];
}

export interface ScrollHeaderInterface {
  blur: boolean;
  velocity?: number;
  direction?: 'scrollDown' | 'scrollUp';
  animation?: 'normal' | 'reverse';
  validScroll?: boolean;
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
  isPage?: boolean;
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
  event: EventInterface | null;
  currentArtist: ArtistInterface | null;
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

export interface UserInterface {
  name: string;
  fullname?: string;
  email?: string;
  avatar?: string | undefined;
  username: string;
  isFriend?: boolean;
}

export interface AuthReducerType {
  loggedUser: UserInterface | undefined;
}

export interface SongInterface {
  id: string;
  album: string;
  artist: string;
  name: string;
  trackNumber: number;
  duration: number;
  cover: string;
  url: string;
  favorite?: boolean;
}
export interface PlaylistInterface {
  name: string;
  id: number;
  source: 'radio' | 'artist' | 'playlist' | 'mixtape';
  sourceId: number;
  cover: string;
  items: SongInterface[];
  owner: string;
}
export interface PlayerReducerType {
  expanded: boolean;
  playing: boolean;
  paused: boolean;
  song?: SongInterface;
  playlist?: PlaylistInterface;
  playlistIndex?: number;
  timeElapsed: number;
  canSkip: boolean;
  shuffle: boolean;
  repeat: boolean;
}

export interface CommunityReducerType {
  posts: PostInterface[];
  stories: StorieInterface[];
  currentCommunityArtist: CommunityArtistInterface | null;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface StorieInterface {
  image: string;
  label: string;
}

export interface CommunityArtistInterface extends UserInterface {}

export interface PostInterface {
  username: string;
  avatar: string;
  image: string;
  commentsQuantity: number;
  comments: CommentInterface[];
}

export interface CommentInterface {}

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
  whoIsGoing?: EventWhoIsGoingInterface[];
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
  blue = 'blue',
  supported = 'supported',
  disable = 'disable',
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary'
}

export interface DiscographyInterface {
  cover: string | undefined;
  name: string;
}

export interface GalleryInterface {
  cover: string | undefined;
  name: string;
  quantity: number;
  items: AlbumInterface[][];
}

export interface AlbumInterface {
  image: string | undefined;
  name?: string;
  redirectUrl?: string;
}

export interface ReadMoreInterface {
  title?: string;
  items: AlbumInterface[];
}

export interface BiographyInterface {
  template: string;
  title: string;
  name: string;
  subtitle?: string;

  chapter: number;
  accessLevel: number;

  headline: string;
  nameHeadline: string;
  cover: string;
  skyline?: string;
  byline?: string;
  leadParagraph?: string;
  items?: AlbumInterface[];
  readMore?: ReadMoreInterface;
}

export interface EventWhoIsGoingInterface extends UserInterface {}

export enum ShapesSize {
  rounded = 'rounded',
  circle = 'circle',
  normal = 'normal',
  full = 'full'
}
