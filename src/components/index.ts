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
import MenuProfileComponent from './menu/profile';
import CardArtistComponent from './card/artist';
import PlayerComponent from './player';

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
  MenuProfileComponent as MenuProfile,
  CardArtistComponent as CardArtist,
  PlayerComponent as Player
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
const ArtistPharrellWilliamsAlbumNumberOneImage = require('./../assets/img/artists/pharrell-williams/album/number_one.png');

export {
  BackgroundInitialImage,
  BackgroundCircleWhiteImage,
  BackgroundCircleBrownImage,
  BackgroundCircleDarkGrayImage,
  BackgroundCircleBlackImage,
  BackgroundCircleSteelBlueImage,
  BackgroundSignInImage,
  ArtistPharrellWilliamsImage,
  ArtistLmfaoImage,
  ArtistPharrellWilliamsAlbumNumberOneImage,
  BackgroundSignUpConfirmImage
};
