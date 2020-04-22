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
  GET_ARTIST_GALLERY_COMMENTS_API = 'GET_ARTIST_GALLERY_COMMENTS_API',
  GET_ARTIST_GALLERY_COMMENTS_API_SUCCESS = 'GET_ARTIST_GALLERY_COMMENTS_API_SUCCESS',
  GET_ARTIST_GALLERY_COMMENTS_API_FAILURE = 'GET_ARTIST_GALLERY_COMMENTS_API_FAILURE',
  UPDATE_ARTIST_SET_INITIAL_PROPERTY = 'UPDATE_ARTIST_SET_INITIAL_PROPERTY',
  ACTION_PLAYER = 'ACTION_PLAYER',
  CORDOVA_ACTION_PLAYER = 'CORDOVA_ACTION_PLAYER',
  TOGGLE_PLAYER = 'TOGGLE_PLAYER',
  TOGGLE_CURRENT_NEXT_SONG = 'TOGGLE_CURRENT_NEXT_SONG',
  LOAD_NEXT_SONG = 'LOAD_NEXT_SONG',
  FADING_OUT_SONG = 'FADING_OUT_SONG',
  PLAY_SONG = 'PLAY_SONG',
  NEXT_SONG = 'NEXT_SONG',
  PREV_SONG = 'PREV_SONG',
  STOP_SONG = 'STOP_SONG',
  PAUSE_SONG = 'PAUSE_SONG',
  RESUME_SONG = 'RESUME_SONG',
  SEEK_TO_SONG = 'SEEK_TO_SONG',
  UPDATE_ELAPSED_SONG = 'UPDATE_ELAPSED_SONG',
  UPDATE_MASTER_VOLUME = 'UPDATE_MASTER_VOLUME',
  FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS',
  TOGGLE_SHUFFLE_PLAYER = 'TOGGLE_SHUFFLE_PLAYER',
  TOGGLE_REPEAT_PLAYER = 'TOGGLE_REPEAT_PLAYER',
  FAVORITE_SONG = 'FAVORITE_SONG',
  SET_PLAYLIST = 'SET_PLAYLIST',
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
  GET_COMMUNITY_STORIES_API_SUCCESS = 'GET_COMMUNITY_STORIES_API_SUCCESS',
  GET_COMMUNITY_COMMENTARIES_API = 'GET_COMMUNITY_COMMENTARIES_API',
  GET_COMMUNITY_COMMENTARIES_API_FAILURE = 'GET_COMMUNITY_COMMENTARIES_API_FAILURE',
  GET_COMMUNITY_COMMENTARIES_API_SUCCESS = 'GET_COMMUNITY_COMMENTARIES_API_SUCCESS',
  GET_COMMUNITY_COMMENTARIES_COVER_API = 'GET_COMMUNITY_COMMENTARIES_COVER_API',
  GET_COMMUNITY_COMMENTARIES_COVER_API_FAILURE = 'GET_COMMUNITY_COMMENTARIES_COVER_API_FAILURE',
  GET_COMMUNITY_COMMENTARIES_COVER_API_SUCCESS = 'GET_COMMUNITY_COMMENTARIES_COVER_API_SUCCESS',
  GET_SEARCH_RESULT_API = 'GET_SEARCH_RESULT_API',
  GET_SEARCH_RESULT_API_FAILURE = 'GET_SEARCH_RESULT_API_FAILURE',
  GET_SEARCH_RESULT_API_SUCCESS = 'GET_SEARCH_RESULT_API_SUCCESS',
  UPDATE_PROFILE_PROPERTY = 'UPDATE_PROFILE_PROPERTY',
  UPDATE_AUTH_SIGN_UP_PROPERTY = 'UPDATE_AUTH_SIGN_UP_PROPERTY',
  GET_FEED_POSTS_API = 'GET_FEED_POSTS_API',
  GET_FEED_POSTS_API_FAILURE = 'GET_FEED_POSTS_API_FAILURE',
  GET_FEED_POSTS_API_SUCCESS = 'GET_FEED_POSTS_API_SUCCESS',
  GET_RADIO_ARTIST = 'GET_RADIO_ARTIST',
  GET_RADIO_ARTIST_SUCCESS = 'GET_RADIO_ARTIST_SUCCESS',
  GET_RADIO_ARTIST_FAILURE = 'GET_RADIO_ARTIST_FAILURE'
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
  videos?: {
    recents: VideoInterface[];
    showcase: VideoInterface[];
  };
}

export interface SearchInterface {
  result: object[] | null;
}
export interface ArtistCoverInterface {
  main: string | undefined;
  background: string | undefined;
  event: string | undefined;
  biography: string | undefined;
  deepDive: string | undefined;
}

export interface DailyDripType {
  id: string;
  name: string;
  total: number;
  lastViewed: number;
  artistUsername: string;
  items: DailyDripItem[];
}
export interface DailyDripItem {
  id: string;
  createdAt: number;
  dripType: 'image' | 'video';
  href: string;
  duration: number;
}

export interface SettingsReducerType {
  tabs: TabsInterface[];
  links: LinksInterface[];
  fanTabs: MenuInterface[];
  artistTabs: MenuInterface[];
  modal: ModalSlideInterface;
  plans: PlanInterface[];
  selectedPlan: PlanInterface | null;
  activeDeepDiveTab: string;
  deepDiveTabs: MenuInterface[];
  messageTabs: MenuInterface[];
  activeMessageTab: string;
  activeFanTab: string;
  activeProfileFriendTab: string;
  profileFriendTabs: MenuInterface[];
  selectContactTabs: MenuInterface[];
  activeSelectContactTab: string;
}

export interface ScrollHeaderInterface {
  blur: boolean;
  velocity?: number;
  direction?: 'scrollDown' | 'scrollUp';
  animation: 'normal' | 'reverse';
  validScroll?: boolean;
}
export type ModalType = 'left' | 'right' | 'top' | 'bottom';
export interface ModalSlideInterface {
  modalType?: ModalType;
  content: React.ReactNode;
  className?: string;
  height?: number;
  onClick?: Function;
  onClose?: Function;
  onClosing?: Function;
  onOpen?: Function;
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
  currentGalleryComments: CommentInterface[];
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
  signUpUser: SignUpInterface;
}

export interface SearchReducerType {
  queryResult: string | '';
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
  playerAction?: string;
  expanded: boolean;
  fadingOut: boolean;
  playing: boolean;
  paused: boolean;
  stopped: boolean;
  canSkip: boolean;
  shuffle: boolean;
  repeat: boolean;
  masterVolume: number;
  timeElapsed: number;
  song?: SongInterface;
  next?: SongInterface;
  playlist?: PlaylistInterface;
  firstIndex: number;
}

export interface CommunityReducerType {
  posts: PostInterface[];
  stories: StorieInterface[];
  currentCommunityArtist: CommunityArtistInterface | null;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  currentPostComments: CommentInterface[] | null;
  currentPostCover: CommentCoverInterface;
}

export interface FeedReducerType {
  posts: PostInterface[];
  stories: StorieInterface[];
  currentCommunityArtist: CommunityArtistInterface | null;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  currentPostComments: CommentInterface[] | null;
  currentPostCover: CommentCoverInterface;
}

export interface StorieInterface {
  image: string;
  label: string;
}

export interface CommunityArtistInterface extends UserInterface {}
export interface FanFeedInterface extends UserInterface {}

export interface PostInterface {
  username: string;
  avatar: string;
  image: string;
  commentsQuantity: number;
  comments: CommentInterface[];
}

export interface CommentInterface {
  text?: string;
  user: UserInterface;
  replies?: CommentInterface[] | null;
}

export interface CommentCoverInterface {
  url: string;
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

export enum MediaCallback {
  MEDIA_STATE = 1,
  MEDIA_DURATION = 2,
  MEDIA_POSITION = 3,
  MEDIA_ERROR = 9
}
export enum MediaStatusCallback {
  MEDIA_NONE = 0,
  MEDIA_STARTING = 1,
  MEDIA_RUNNING = 2,
  MEDIA_PAUSED = 3,
  MEDIA_STOPPED = 4,
  MEDIA_ENDED = 5,
  MEDIA_FADING_OUT = 6
}

export enum Colors {
  support = 'support',
  transparentGray = 'transparent-gray',
  transparent = 'transparent',
  green = 'green',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  gold = 'gold',
  blue = 'blue',
  chat = 'chat',
  lightBlue = 'light-blue',
  supported = 'supported',
  disable = 'disable',
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  grayTransparent = 'gray-transparent',
  cyan = 'cyan'
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
export type RouterLinkDirection = 'forward' | 'back' | 'root';
export enum ShapesSize {
  rounded = 'rounded',
  badge = 'badge',
  circle = 'circle',
  normal = 'normal',
  full = 'fluid'
}
export enum Sizes {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  full = 'full-width',
  lg = 'lg',
  xl = 'xl'
}
export enum GradientDirection {
  vertical = 'vertical',
  horizontal = 'horizontal'
}
export interface VideoInterface {
  image: string;
  video: string;
  time: number | string;
  datePublished: Date;
}

export type RadioSection = 'Genre' | 'Vibe' | 'Era' | 'Artist';
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

export interface ProfileActionsType {
  text: string;
  onClick: () => void;
}

export interface ProfileReducerType {
  messages: MessageInterface[];
  notifications: NotificationInterface[];
  notificationsSearch: NotificationInterface[];
  messagesSearch: MessageInterface[];
  friends: UserInterface[];
  friendsSearch: UserInterface[];
  artists: UserInterface[];
  artistsSearch: UserInterface[];
  admins: UserInterface[];
  adminsSearch: UserInterface[];
}

export interface MessageInterface extends UserInterface {
  message: string;
  sendAt: Date;
  read: boolean;
}

export interface NotificationInterface extends UserInterface {
  message: string;
  sendAt: Date;
  read: boolean;
  subject: string;
}

export interface SignUpInterface {
  nickname: string;
  email: string;
}
export interface RadioReducerType {
  radioArtist: any;
  loading: boolean;
  errorMessage: string | null;
}

export interface MediaType {
  updateInterval: number;
  getDuration(): number;
  getPosition(): number;
  getMediaState(): number;
  getState(): string;
  running(): any;
  primary(): any;
  getPaused(): boolean;
  getPlaying(): boolean;
  getEnded(): boolean;
  getLoading(): boolean;
  getStopped(): boolean;
  getFadeIn(): boolean;
  getFadeOut(): boolean;
  getFadingOut(): boolean;
  setFadeIn(value: boolean): void;
  setFadeOut(value: boolean): void;
  setFadingOut(value: boolean): void;
  setForceFadeOut(value: boolean): void;
  setFadeVolume(volume: number): void;
  setFadeInOut(): void;
  setFadeTime(seconds: number): void;
  getMediaInstanceNumber(): number;
  setMediaInstanceNumber(instance: number): void;
  getMediaId(): string;
  setMediaId(id: string): void;
  updatePosition(): void;
  updateAudioPosition(): void;
  getVolume(): number;
  getPrimary(): boolean;
  setPrimary(value: boolean): void;
  play(iosPlayOptions?: any): void;
  pause(): void;
  release(): void;
  seekTo(position: number): void;
  setVolume(volume: number): void;
  stop(): void;
  position: number;
  duration: number;
  mediaState: number;
  id: any;
  src: string;
}
