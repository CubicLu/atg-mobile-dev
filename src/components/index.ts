/* eslint-disable @typescript-eslint/no-var-requires */
import _ from 'lodash';
import ButtonComponent from './button';
import BackgroundImageComponent from './background-image';
import InputTextComponent from './input/text';
import InputCodeComponent from './input/code';
import ButtonIconComponent from './button/icon';
import TabComponent from './tab';

export * from './icon';

export {
  ButtonComponent as Button,
  BackgroundImageComponent as BackgroundImage,
  InputTextComponent as InputText,
  ButtonIconComponent as ButtonIcon,
  TabComponent as Tab,
  InputCodeComponent as InputCode
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

export {
  BackgroundInitialImage,
  BackgroundCircleWhiteImage,
  BackgroundCircleBrownImage,
  BackgroundCircleDarkGrayImage,
  BackgroundCircleBlackImage,
  BackgroundCircleSteelBlueImage,
  BackgroundSignInImage,
  BackgroundSignUpConfirmImage
};
