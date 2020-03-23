/* eslint-disable @typescript-eslint/no-var-requires */
import _ from 'lodash';
import ButtonComponent from './button';
import BackgroundImageComponent from './background-image';
import InputTextComponent from './input/text';
import InputCodeComponent from './input/code';
import ButtonIconComponent from './button/icon';
import HeaderProfileComponent from './header/profile';
import AvatarComponent from './avatar';
import CardArtistComponent from './card/artist';
import CardMixtapesComponent from './card/mixtapes';
import SliderMixtapesComponent from './slider/mixtapes';
import PlayerComponent from './player';
import HeaderComponent from './header';
import HeaderOverlayComponent from './header-overlay';
import MenuComponent from './menu';
import SliderImageComponent from './slider/image';
import SliderVideoComponent from './slider/video';
import CardImageComponent from './card/image';
import CardVideoComponent from './card/video';
import SliderRadioComponent from './slider/radio';
import SliderEventsComponent from './slider/events';
import CardEventComponent from './card/event';
import ModalSlideComponent from './modal/slide';
import MenuFanSupportOptionsComponent from './menu/fan-support-options';
import BiographyListComponent from './menu/biography-list';
import ButtonPlanComponent from './button/plan';
import ListComponent from './list';
import SupportByComponent from './support-by';
import MenuArtistListComponent from './menu/artist-list';
import CardAlbumGalleryComponent from './card/album-gallery';
import LoaderFullscreenComponent from './loader/fullscreen';
import ButtonSupportComponent from './button/support';
import SliderStoriesComponent from './slider/stories';

export * from './icon';

export {
  ButtonComponent as Button,
  BackgroundImageComponent as BackgroundImage,
  InputTextComponent as InputText,
  ButtonIconComponent as ButtonIcon,
  InputCodeComponent as InputCode,
  HeaderProfileComponent as HeaderProfile,
  AvatarComponent as Avatar,
  CardArtistComponent as CardArtist,
  CardMixtapesComponent as CardMixtapes,
  SliderMixtapesComponent as SliderMixtapes,
  PlayerComponent as Player,
  HeaderComponent as Header,
  HeaderOverlayComponent as HeaderOverlay,
  MenuComponent as Menu,
  SliderImageComponent as SliderImage,
  SliderVideoComponent as SliderVideo,
  CardImageComponent as CardImage,
  CardVideoComponent as CardVideo,
  SliderRadioComponent as SliderRadio,
  SliderEventsComponent as SliderEvents,
  CardEventComponent as CardEvent,
  ModalSlideComponent as ModalSlide,
  MenuFanSupportOptionsComponent as MenuFanSupportOptions,
  BiographyListComponent as BiographyList,
  ButtonPlanComponent as ButtonPlan,
  ListComponent as List,
  SupportByComponent as SupportBy,
  MenuArtistListComponent as MenuArtistList,
  CardAlbumGalleryComponent as CardAlbumGallery,
  LoaderFullscreenComponent as LoaderFullscreen,
  ButtonSupportComponent as ButtonSupport,
  SliderStoriesComponent as SliderStories
};

export { _ };

const BackgroundInitialImage = require('./../assets/img/background/initial/1.png');
const BackgroundSignInImage = require('./../assets/img/background/sign-in/1.png');
const BackgroundSignUpConfirmImage = require('./../assets/img/background/sign-up-confirm/1.png');

const BackgroundCircleBubblesOrangeImage = require('./../assets/img/background/circles/orange-bubbles.png');
const BackgroundCircleBubblesImage = require('./../assets/img/background/circles/black-bubbles.png');
const BackgroundCircleBubblesInverted = require('./../assets/img/background/circles/black-bubbles-inverted.png');
const BackgroundCircleBubblesLightImage = require('./../assets/img/background/circles/white-bubbles.png');
const BackgroundCircleBubblesLightInverted = require('./../assets/img/background/circles/white-bubbles-inverted.png');

const MixtapeEuroHouseImage = require('./../assets/img/mixtapes/euro-house.png');
const MixtapeKnightImage = require('./../assets/img/mixtapes/knight.png');
const MixtapeMoonLightImage = require('./../assets/img/mixtapes/moon-light.png');
const MixtapeRebelRockImage = require('./../assets/img/mixtapes/rebel-rock.png');

export {
  BackgroundInitialImage,
  BackgroundCircleBubblesImage,
  BackgroundCircleBubblesInverted,
  BackgroundCircleBubblesLightImage,
  BackgroundCircleBubblesLightInverted,
  BackgroundSignInImage,
  BackgroundSignUpConfirmImage,
  MixtapeEuroHouseImage,
  MixtapeKnightImage,
  MixtapeMoonLightImage,
  MixtapeRebelRockImage,
  BackgroundCircleBubblesOrangeImage
};
