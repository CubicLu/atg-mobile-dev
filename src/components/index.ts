/* eslint-disable @typescript-eslint/no-var-requires */
import _ from 'lodash';
import ButtonComponent from './button';
import BackgroundImageComponent from './background-image';
import InputTextComponent from './input/text';
import InputCodeComponent from './input/code';
import ButtonIconComponent from './button/icon';
import TabComponent from './tab';
import HeaderProfileComponent from './header/profile';
import AvatarComponent from './avatar';
import CardArtistComponent from './card/artist';
import CardMixtapesComponent from './card/mixtapes';
import SliderMixtapesComponent from './slider/mixtapes';
import PlayerComponent from './player';
import HeaderComponent from './header';
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

export * from './icon';

export {
  ButtonComponent as Button,
  BackgroundImageComponent as BackgroundImage,
  InputTextComponent as InputText,
  ButtonIconComponent as ButtonIcon,
  TabComponent as Tab,
  InputCodeComponent as InputCode,
  HeaderProfileComponent as HeaderProfile,
  AvatarComponent as Avatar,
  CardArtistComponent as CardArtist,
  CardMixtapesComponent as CardMixtapes,
  SliderMixtapesComponent as SliderMixtapes,
  PlayerComponent as Player,
  HeaderComponent as Header,
  MenuComponent as Menu,
  SliderImageComponent as SliderImage,
  SliderVideoComponent as SliderVideo,
  CardImageComponent as CardImage,
  CardVideoComponent as CardVideo,
  SliderRadioComponent as SliderRadio,
  SliderEventsComponent as SliderEvents,
  CardEventComponent as CardEvent,
  ModalSlideComponent as ModalSlide,
  MenuFanSupportOptionsComponent as MenuFanSupportOptions
};

export { _ };

const BackgroundInitialImage = require('./../assets/img/background/initial/1.png');
const BackgroundSignInImage = require('./../assets/img/background/sign-in/1.png');
const BackgroundSignUpConfirmImage = require('./../assets/img/background/sign-up-confirm/1.png');

const BackgroundCircleWhiteImage = require('./../assets/img/background/circles/white.png');
const BackgroundCircleBrownImage = require('./../assets/img/background/circles/brown.png');
const BackgroundCircleDarkGrayImage = require('./../assets/img/background/circles/dark-gray.png');
const BackgroundCircleBlackImage = require('./../assets/img/background/circles/black.png');
const BackgroundCircleSteelBlueImage = require('./../assets/img/background/circles/steel-blue.png');

const BackgroundCircleBubblesImage = require('./../assets/img/background/circles/black-bubbles.png');
const BackgroundCircleBubblesInverted = require('./../assets/img/background/circles/black-bubbles-inverted.png');
const BackgroundCircleBubblesLightImage = require('./../assets/img/background/circles/white-bubbles.png');
const BackgroundCircleBubblesLightInverted = require('./../assets/img/background/circles/white-bubbles-inverted.png');

const ArtistLmfaoImage = require('./../assets/img/artists/lmfao/artist.png');
const ArtistPharrellWilliamsImage = require('./../assets/img/artists/pharrell-williams/artist.png');
const ArtistPharrellWilliamsBackgroundImage = require('./../assets/img/artists/pharrell-williams/background.png');
const ArtistPharrellWilliamsAlbumNumberOneImage = require('./../assets/img/artists/pharrell-williams/album/number_one.png');

const MixtapeEuroHouseImage = require('./../assets/img/mixtapes/euro-house.png');
const MixtapeKnightImage = require('./../assets/img/mixtapes/knight.png');
const MixtapeMoonLightImage = require('./../assets/img/mixtapes/moon-light.png');
const MixtapeRebelRockImage = require('./../assets/img/mixtapes/rebel-rock.png');

export {
  BackgroundInitialImage,
  BackgroundCircleWhiteImage,
  BackgroundCircleBrownImage,
  BackgroundCircleDarkGrayImage,
  BackgroundCircleBlackImage,
  BackgroundCircleSteelBlueImage,
  BackgroundCircleBubblesImage,
  BackgroundCircleBubblesInverted,
  BackgroundCircleBubblesLightImage,
  BackgroundCircleBubblesLightInverted,
  BackgroundSignInImage,
  BackgroundSignUpConfirmImage,
  ArtistPharrellWilliamsImage,
  ArtistLmfaoImage,
  MixtapeEuroHouseImage,
  MixtapeKnightImage,
  MixtapeMoonLightImage,
  MixtapeRebelRockImage,
  ArtistPharrellWilliamsAlbumNumberOneImage,
  ArtistPharrellWilliamsBackgroundImage
};
