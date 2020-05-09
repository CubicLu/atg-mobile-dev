import { AxiosResponse, AxiosError } from 'axios';

export interface APIResponseInterface<T> extends AxiosResponse {}
export interface APIErrorInterface<T> extends AxiosError {}
export interface Action<T> {
  type: ActionType;
  payload: T;
}
export interface SingleAction {
  type: ActionType;
}

export enum ActionType {
  UPDATE_SETTINGS_PROPERTY = 'UPDATE_SETTINGS_PROPERTY',
  UPDATE_ARTIST_PROPERTY = 'UPDATE_ARTIST_PROPERTY',
  UPDATE_AUTH_PROPERTY = 'UPDATE_AUTH_PROPERTY',
  UPDATE_SETTINGS_MODAL = 'UPDATE_SETTINGS_MODAL',
  UPDATE_POPUP_MODAL = 'UPDATE_POPUP_MODAL',
  GET_ARTISTS_API = 'GET_ARTISTS_API',
  GET_ARTISTS_API_FAILURE = 'GET_ARTISTS_API_FAILURE',
  GET_ARTISTS_API_SUCCESS = 'GET_ARTISTS_API_SUCCESS',
  GET_ARTIST_API = 'GET_ARTIST_API',
  GET_ARTIST_API_FAILURE = 'GET_ARTIST_API_FAILURE',
  GET_ARTIST_API_SUCCESS = 'GET_ARTIST_API_SUCCESS',
  CLEAR_CURRENT_ARTIST = 'CLEAR_CURRENT_ARTIST',
  GET_ARTIST_EVENT_API = 'GET_ARTIST_EVENT_API',
  GET_ARTIST_EVENT_API_FAILURE = 'GET_ARTIST_EVENT_API_FAILURE',
  GET_ARTIST_EVENT_API_SUCCESS = 'GET_ARTIST_EVENT_API_SUCCESS',
  GET_ARTIST_GALLERY_COMMENTS_API = 'GET_ARTIST_GALLERY_COMMENTS_API',
  GET_ARTIST_GALLERY_COMMENTS_API_SUCCESS = 'GET_ARTIST_GALLERY_COMMENTS_API_SUCCESS',
  GET_ARTIST_GALLERY_COMMENTS_API_FAILURE = 'GET_ARTIST_GALLERY_COMMENTS_API_FAILURE',
  SET_CURRENT_GALLERY = 'SET_CURRENT_GALLERY',
  CLEAR_CURRENT_GALLERY = 'CLEAR_CURRENT_GALLERY',
  SET_FULLSCREEN_IMAGE = 'SET_FULLSCREEN_IMAGE',
  CLEAR_FULLSCREEN_IMAGE = 'CLEAR_FULLSCREEN_IMAGE',
  UPDATE_ARTIST_SET_INITIAL_PROPERTY = 'UPDATE_ARTIST_SET_INITIAL_PROPERTY',
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
  UPDATE_SONG_DURATION = 'UPDATE_SONG_DURATION',
  UPDATE_MASTER_VOLUME = 'UPDATE_MASTER_VOLUME',
  FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS',
  TOGGLE_SHUFFLE_PLAYER = 'TOGGLE_SHUFFLE_PLAYER',
  TOGGLE_REPEAT_PLAYER = 'TOGGLE_REPEAT_PLAYER',
  FAVORITE_SONG = 'FAVORITE_SONG',
  SET_PLAYLIST = 'SET_PLAYLIST',
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
  GET_FRIENDS_API = 'GET_FRIENDS_API',
  GET_FRIEND_API = 'GET_FRIEND_API',
  GET_FRIENDS_API_FAILURE = 'GET_FRIENDS_API_FAILURE',
  GET_FRIENDS_API_SUCCESS = 'GET_FRIENDS_API_SUCCESS',
  GET_FRIEND_API_SUCCESS = 'GET_FRIEND_API_SUCCESS',
  GET_FRIEND_API_FAILURE = 'GET_FRIEND_API_FAILURE',
  UPDATE_AUTH_SIGN_UP_PROPERTY = 'UPDATE_AUTH_SIGN_UP_PROPERTY',
  GET_FEED_POSTS_API = 'GET_FEED_POSTS_API',
  GET_FEED_POSTS_API_FAILURE = 'GET_FEED_POSTS_API_FAILURE',
  GET_FEED_POSTS_API_SUCCESS = 'GET_FEED_POSTS_API_SUCCESS',
  GET_RADIO_ARTIST = 'GET_RADIO_ARTIST',
  GET_RADIO_ARTIST_SUCCESS = 'GET_RADIO_ARTIST_SUCCESS',
  GET_RADIO_ARTIST_FAILURE = 'GET_RADIO_ARTIST_FAILURE',
  TOGGLE_NAVBAR_TWOACTIONS = 'TOGGLE_NAVBAR_TWOACTIONS',
  UPDATE_NAVBAR_TWOACTIONS = 'UPDATE_NAVBAR_TWOACTIONS',
  UPDATE_NAVBAR_PROPERTY = 'UPDATE_NAVBAR_PROPERTY',
  LOADING_PLAYER = 'LOADING_PLAYER',
  SHOW_TOAST = 'SHOW_TOAST',
  HIDE_TOAST = 'HIDE_TOAST',
  GET_DASHBOARD_BY_ARTIST_API = 'GET_DASHBOARD_BY_ARTIST_API',
  GET_DASHBOARD_BY_ARTIST_API_FAILURE = 'GET_DASHBOARD_BY_ARTIST_API_FAILURE',
  GET_DASHBOARD_BY_ARTIST_API_SUCCESS = 'GET_DASHBOARD_BY_ARTIST_API_SUCCESS',
  UPDATE_DASHBOARD_PROPERTY = 'UPDATE_DASHBOARD_PROPERTY',
  UPDATE_DASHBOARD_SET_INITIAL_PROPERTY = 'UPDATE_DASHBOARD_SET_INITIAL_PROPERTY'
}

export interface TabsInterface {
  path: string;
  icon: any;
  id: string;
  component: any;
}
export interface RouteInterface {
  path: string;
  icon?: any;
  id: string;
  component?: any;
}
export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
}

export interface ArtistInterface {
  bandMembers?: BandMemberInterface[];
  tiles?: AlbumInterface[];
  cover: ArtistCoverInterface;
  name: string;
  avatar?: string;
  support?: boolean;
  username: string;
  backgroundGradient?: GradientColorsInterface | null;
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
  dashboard?: string;
  videoCover?: string;
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
  activeTab: string;
  routes: RouteInterface[];
  fanTabs: MenuInterface[];
  artistTabs: MenuInterface[];
  modal: ModalSlideInterface;
  showToast: boolean;
  popUpModal: string | null;
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
  eraFilters: object[];
  activeDashboardTab: string;
  dashboardTabs: MenuInterface[];
  era: string;
  subEra: SubEraInterface[];
  genreFilters: object[];
  selectedGenres: string[];
  notifications: number;
  settingsMenu: MenuInterface[];
}
export interface NavbarReducerType {
  navbarTwoButtons: NavbarTwoButtons;
}

export interface NavbarTwoButtons {
  status: boolean;
  leftLabel?: string;
  rightLabel?: string;
  leftAction?: Function;
  rightAction?: Function;
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
  playlist?: PlaylistInterface;
}

export interface ArtistReducerType {
  artists: ArtistInterface[];
  event: EventInterface | null;
  currentGallery: GalleryImageInterface[] | null;
  currentArtist: ArtistInterface | null;
  fullScreenImage: string | null;
  fullScreenImageIndex: number;
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
  id?: number;
}

export interface AuthReducerType {
  loggedUser: UserInterface | undefined;
  signUpUser: SignUpInterface;
}

export interface SearchReducerType {
  queryResult: string | '';
}

export interface SongInterface {
  id: number;
  backgroundGradient?: GradientColorsInterface;
  title: string;
  album: string;
  artist: string;
  duration: number;
  cover: string;
  coverArtist?: string;
  trackNumber: number;
  url: string;
  ISRC?: string;
  favorite?: boolean;
}
export interface SetPlaylistInterface {
  playlist: PlaylistInterface;
  song: SongInterface;
}
export interface SeekPositionInteface {
  seekTo: number;
  increase: boolean;
}
export interface PlaySongInterface {
  song: SongInterface;
  nextSong?: SongInterface;
}

export interface PlaylistInterface {
  name: string;
  id: number;
  source: 'radio' | 'artist' | 'playlist' | 'mixtape';
  sourceId: number;
  cover: string;
  items: SongInterface[];
  owner: string;
  color1?: string;
  color2?: string;
}
export interface PlayerReducerType {
  playerAction?: string;
  expanded: boolean;
  starting: boolean;
  fadingOut: boolean;
  playing: boolean;
  paused: boolean;
  stopped: boolean;
  canSkip: boolean;
  shuffle: boolean;
  repeat: boolean;
  masterVolume: number;
  timeElapsed: number;
  duration: number;
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
  url?: string;
}

export interface CommunityArtistInterface extends UserInterface {
  backgroundGradient: GradientColorsInterface | null;
  posts: PostInterface[];
  stories: StorieInterface[];
}
export interface FanFeedInterface extends UserInterface {}

export interface PostInterface {
  id: string;
  username: string;
  artist: boolean;
  avatar: string;
  image: string | string[];
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
  description?: string;
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
  transparentRed = 'transparent-red',
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
  cyan = 'cyan',
  gray = 'gray'
}

export interface DiscographyInterface {
  albumId: number;
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
  cols?: number;
  redirectUrl?: string;
}

export interface BandMemberInterface {
  image: string;
  name: string;
  redirectUrl?: string;
}

export interface ReadMoreInterface {
  title?: string;
  items: AlbumInterface[];
}

export interface BiographyInterface {
  chapter: number;
  template: string;
  title: string;
  titleColor: string;
  headerColor: string;

  name: string;
  featureColor: string;
  subtitle?: string;

  accessLevel: number;

  headline: string;
  headlineColor: any;

  nameHeadline: string;
  cover: string;
  skyline?: string;
  skylineBefore?: boolean;
  byline?: string;
  leadParagraph?: string;
  textColor: string;
  items?: AlbumInterface[];
  readMore?: ReadMoreInterface;
}

export interface EventWhoIsGoingInterface extends UserInterface {}
export type RouterLinkDirection = 'forward' | 'back' | 'root' | 'none';
export type RouterLinkAction = 'push' | 'replace' | 'pop';
export enum ShapesSize {
  rounded = 'rounded',
  roundedFrame = 'rounded-frame',
  badge = 'badge',
  circle = 'circle',
  normal = 'normal',
  small = 'small',
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

export interface GenericModalInterface {
  name: string;
  url?: string;
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
  friendsSelected: number[];
  recentSelected: number[];
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

export interface FriendInterface {
  name: string;
  nickname: string;
  city: string;
  image: string;
  background?: string;
  followers: number;
  friend: boolean;
}

export interface FriendReducerType {
  friends: FriendInterface[];
  currentFriend?: FriendInterface;
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

export interface GetFriendAPIInterface {
  friendId: string;
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

export interface ModalTypeInterface {
  modalType: string | null;
}
export interface GalleryImageInterface {
  image: string;
}

export interface GalleryIdInterface {
  galleryId: number;
}

export interface GalleryImageIndexInterface {
  index: number;
}

export interface GenreInterface {
  name: string;
  image: string;
}

export interface SubGenreInterface {
  name: string;
  selected: boolean;
}

export interface SubEraInterface {
  name: string;
  selected: boolean;
}

export interface MediaType {
  getDuration(): number;
  getPosition(): number;
  getMediaState(): number;
  getState(): string;
  getByMediaId(id: string): any;
  list(): MediaType[];
  running(): any;
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

  setForceFadeOut(value: boolean): void;
  setFadingOut(value: boolean): void;

  setFadeVolume(volume: number): void;
  setFadeInOut(): void;
  setFadeTime(seconds: number): void;

  getMediaId(): number;
  setMediaId(id: number): void;

  updatePosition(): void;
  updateAudioPosition(): void;
  getVolume(): number;

  play(iosPlayOptions?: any): void;
  pause(): void;
  release(): void;
  seekTo(position: number): void;
  setVolume(volume: number): void;
  stop(): void;
  id: string;
  src: string;
}
export interface CameraOptions {
  quality?: number; // Picture quality in range 0-100. Default is 50
  sourceType?: number; //1 Camera, 2. SavedPhotoAlbum, 0. PhotoLibrary
  allowEdit?: boolean;
  encodingType?: number; //0 JPEG 1 PNG
  targetWidth?: number;
  targetHeight?: number;
  mediaType?: number; //0. PICTURE, 1.VIDEO, 2.ALLMEDIA
  correctOrientation?: boolean; // Rotate to correct for the orientation */
  saveToPhotoAlbum?: boolean; //save after capture
  cameraDirection?: number; //1.back and 0.front
  destinationType?: number;
  /**
   * Choose the format of the return value.
   * Defined in navigator.camera.DestinationType. Default is FILE_URI.
   *      DATA_URL : 0,   Return image as base64-encoded string
   *      FILE_URI : 1,   Return image file URI
   *      NATIVE_URI : 2  Return image native URI
   *          (e.g., assets-library:// on iOS or content:// on Android)
   */
}
export interface Camera {
  cleanup(onSuccess: () => void, onError: (message: string) => void): void;
  getPicture(
    cameraSuccess: (data: string) => void,
    cameraError: (message: string) => void,
    cameraOptions?: CameraOptions
  ): void;
}
export interface ActionCallbackInterface<T> {
  type: ActionType;
  payload?: T;
}

export interface GalleryImageInterface {
  image: string;
}

export interface GalleryIdInterface {
  galleryId: number;
}

export interface GalleryImageIndexInterface {
  index: number;
}

export interface DashboardReducerType {
  dashboard: DashboardInterface | null;
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

export interface DashboardInterface {
  artist: ArtistInterface;
}
