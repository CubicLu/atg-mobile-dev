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
  MenuComponent as Menu
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
