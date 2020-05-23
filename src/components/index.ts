import ContentLoader from 'react-content-loader';
import ImageSkeletonComponent from './image-skeleton';
import ButtonComponent from './button';
import BackgroundImageComponent from './background-image';
import InputChatComponent from './input/chat';
import InputTextComponent from './input/text';
import InputTextAreaComponent from './input/text-area';
import InputCodeComponent from './input/code';
import ButtonIconComponent from './button/icon';
import FavoriteIconComponent from './button/favorite';
import HeaderProfileComponent from './header/profile';
import AvatarComponent from './avatar';
import CardArtistComponent from './card/artist';
import CardMixtapesComponent from './card/mixtapes';
import SliderMixtapesComponent from './slider/mixtapes';
import PlayerComponent from './player';
import CordovaMediaComponent from './player/cordova-media';
import HeaderComponent from './header';
import HeaderOverlayComponent from './header-overlay';
import MenuComponent from './menu';
import DefaultModalComponent from './modal/default';
import SliderVideoComponent from './slider/video';
import CardImageComponent from './card/image';
import CardCameraComponent from './card/camera';
import CardVideoComponent from './card/video';
import SliderRadioComponent from './slider/radio';
import SliderEventsComponent from './slider/events';
import SliderMembersComponent from './slider/members';
import BottomTilesComponent from './bottom-tiles';
import CardEventComponent from './card/event';
import ModalSlideComponent from './modal/slide';
import ActionSheetComponent from './action-sheet';
import MenuFanSupportOptionsComponent from './menu/fan-support-options';
import ButtonPlanComponent from './button/plan';
import ListItemComponent from './list/item';
import SupportByComponent from './support-by';
import MenuArtistListComponent from './menu/artist-list';
import CardAlbumGalleryComponent from './card/album-gallery';
import LoaderFullscreenComponent from './loader/fullscreen';
import SliderStoriesComponent from './slider/stories';
import CardPostComponent from './card/post';
import PostTextComponent from './post/post-text';
import PostCommentsComponent from './post/post-comments';
import SectionTitleComponent from './section-title';
import VideoPlayerComponent from './video-player';
import SearchResultSectionComponent from './search-result-section';
import PhotoChatComponent from './photo-chat';
import InputSearchComponent from './input/search';
import MenuMessageComponent from './menu/message';
import RadioPlayerComponent from './radio-player';
import RadioPauseButtonComponent from './icon/radio-pause';
import PulsatingDotComponent from './pulsating-dot';
import RowChatComponent from './row/chat';
import RowUserComponent from './row/user';
import ListUserComponent from './list/user';
import InputComboBoxComponent from './input/combo-box';
import VaultFilterSectionComponent from './vault-filter-section';
import PopUpModalComponent from './modal/pop-up/';
import PremiumFeaturesModalContentComponent from './modal/pop-up/premium-features';
import InputToggleComponent from './input/toggle';
import InputChipComponent from './input/chip';
import CardGenreComponent from './card/genre';
import InputCheckboxComponent from './input/checkbox';
import SubGenreModalComponent from './card/genre/subgenre';
import CardEraComponent from './card/era';
import CardSubEraComponent from './card/era/sub-era';
import CardGraphComponent from './card/graph';
import ArrowTopIconComponent from './icon/arrow-top';
import CardRadioComponent from './card/radio';
import SliderRadioCardComponent from './slider/custom-radio';

import SplashScreenComponent from './splash-screen';
import ToastComponent from './toast';

import {
  ButtonSupportIconComponent,
  ButtonSupportComponent
} from './button/support-button';
import NavBarTwoButtonsComponent from './navbar-two-buttons';
import OutlinedButtonComponent from './button/outlined-button';

import ChatBalloonComponent from './chat/balloon';

import PlayerProgressBarComponent from '../components/player/progress-bar';
import PlayerVolumeComponent from '../components/player/volume-bar';
import MiniPlayerBarComponent from '../components/player/mini-player-bar';

import BackgroundInitialImage from './../assets/img/background/initial/1.png';
import BackgroundSignInImage from './../assets/img/background/sign-in/1.png';
import BackgroundSignUpConfirmImage from './../assets/img/background/sign-up-confirm/1.png';

import OrangeBubblesTop from './../assets/img/background/circles/orange-top.png';
import OrangeBubblesBottom from './../assets/img/background/circles/orange-bottom.png';
import BlackBubblesTop from './../assets/img/background/circles/black-top.png';
import BlackBubblesBottom from './../assets/img/background/circles/black-bottom.png';
import WhiteBubblesTop from './../assets/img/background/circles/white-top.png';
import WhiteBubblesBottom from './../assets/img/background/circles/white-bottom.png';

import MixtapeEuroHouseImage from './../assets/img/mixtapes/euro-house.png';
import MixtapeKnightImage from './../assets/img/mixtapes/knight.png';
import MixtapeMoonLightImage from './../assets/img/mixtapes/moon-light.png';
import MixtapeRebelRockImage from './../assets/img/mixtapes/rebel-rock.png';

export * from './icon';

export {
  ImageSkeletonComponent as ImageSkeleton,
  ButtonComponent as Button,
  BackgroundImageComponent as BackgroundImage,
  InputTextComponent as InputText,
  InputTextAreaComponent as InputTextArea,
  InputChatComponent as InputChat,
  ButtonIconComponent as ButtonIcon,
  FavoriteIconComponent as FavoriteIcon,
  InputCodeComponent as InputCode,
  HeaderProfileComponent as HeaderProfile,
  AvatarComponent as Avatar,
  CardArtistComponent as CardArtist,
  CardMixtapesComponent as CardMixtapes,
  SliderMixtapesComponent as SliderMixtapes,
  PlayerComponent as Player,
  CordovaMediaComponent as CordovaMedia,
  HeaderComponent as Header,
  HeaderOverlayComponent as HeaderOverlay,
  MenuComponent as Menu,
  DefaultModalComponent as DefaultModal,
  SliderVideoComponent as SliderVideo,
  CardImageComponent as CardImage,
  CardCameraComponent as CardCamera,
  CardVideoComponent as CardVideo,
  SliderRadioComponent as SliderRadio,
  SliderMembersComponent as SliderMembers,
  SliderEventsComponent as SliderEvents,
  CardEventComponent as CardEvent,
  BottomTilesComponent as BottomTiles,
  ModalSlideComponent as ModalSlide,
  ActionSheetComponent as ActionSheet,
  MenuFanSupportOptionsComponent as MenuFanSupportOptions,
  ButtonPlanComponent as ButtonPlan,
  ListItemComponent as ListItem,
  SupportByComponent as SupportBy,
  MenuArtistListComponent as MenuArtistList,
  CardAlbumGalleryComponent as CardAlbumGallery,
  LoaderFullscreenComponent as LoaderFullscreen,
  ButtonSupportIconComponent as ButtonSupportIcon,
  ButtonSupportComponent as ButtonSupport,
  SliderStoriesComponent as SliderStories,
  CardPostComponent as CardPost,
  PostTextComponent as PostText,
  PostCommentsComponent as PostComment,
  PhotoChatComponent as PhotoChat,
  VideoPlayerComponent as VideoPlayer,
  SectionTitleComponent as SectionTitle,
  SearchResultSectionComponent as SearchResultSection,
  InputSearchComponent as InputSearch,
  MenuMessageComponent as MenuMessage,
  RadioPlayerComponent as RadioPlayer,
  RadioPauseButtonComponent as RadioPauseButton,
  RowChatComponent as RowChat,
  RowUserComponent as RowUser,
  ListUserComponent as ListUser,
  InputComboBoxComponent as InputComboBox,
  VaultFilterSectionComponent as VaultFilterSection,
  PopUpModalComponent as PopUpModal,
  PremiumFeaturesModalContentComponent as PremiumFeaturesModalContent,
  InputToggleComponent as InputToggle,
  InputChipComponent as InputChip,
  NavBarTwoButtonsComponent as NavbarTwoButtons,
  PulsatingDotComponent as PulsatingDot,
  CardGenreComponent as CardGenre,
  InputCheckboxComponent as InputCheckbox,
  SubGenreModalComponent as SubGenreModal,
  CardEraComponent as CardEra,
  PlayerProgressBarComponent as PlayerProgress,
  PlayerVolumeComponent as PlayerVolume,
  MiniPlayerBarComponent as MiniPlayerBar,
  CardSubEraComponent as CardSubEra,
  CardGraphComponent as CardGraph,
  SplashScreenComponent as SplashScreen,
  ArrowTopIconComponent as ArrowTopIcon,
  CardRadioComponent as CardRadio,
  SliderRadioCardComponent as SliderRadioCard,
  ChatBalloonComponent as ChatBalloon,
  OutlinedButtonComponent as OutlinedButton,
  ToastComponent as Toast
};

export {
  OrangeBubblesTop,
  OrangeBubblesBottom,
  BlackBubblesTop,
  BlackBubblesBottom,
  WhiteBubblesTop,
  WhiteBubblesBottom,
  BackgroundInitialImage,
  BackgroundSignInImage,
  BackgroundSignUpConfirmImage,
  MixtapeEuroHouseImage,
  MixtapeKnightImage,
  MixtapeMoonLightImage,
  MixtapeRebelRockImage,
  ContentLoader
};
