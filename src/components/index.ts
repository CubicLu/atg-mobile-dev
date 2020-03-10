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
import ButtonPlanComponent from './button/plan';
import ListComponent from './list';
import SupportByComponent from './support-by';
import MenuArtistsSupportingComponent from './menu/artists-supporting';
import CardAlbumGalleryComponent from './card/album-gallery';

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
  MenuFanSupportOptionsComponent as MenuFanSupportOptions,
  ButtonPlanComponent as ButtonPlan,
  ListComponent as List,
  SupportByComponent as SupportBy,
  MenuArtistsSupportingComponent as MenuArtistsSupporting,
  CardAlbumGalleryComponent as CardAlbumGallery
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
const BackgroundCircleBubblesOrangeImage = require('./../assets/img/background/circles/orange-bubbles.png');

const BackgroundCircleBubblesImage = require('./../assets/img/background/circles/black-bubbles.png');
const BackgroundCircleBubblesInverted = require('./../assets/img/background/circles/black-bubbles-inverted.png');
const BackgroundCircleBubblesLightImage = require('./../assets/img/background/circles/white-bubbles.png');
const BackgroundCircleBubblesLightInverted = require('./../assets/img/background/circles/white-bubbles-inverted.png');

const ArtistLmfaoImage = require('./../assets/img/artists/lmfao/artist.png');
const ArtistPharrellWilliamsImage = require('./../assets/img/artists/pharrell-williams/artist.png');
const ArtistPharrellWilliamsPlaylistImage = require('./../assets/img/artists/pharrell-williams/playlist.png');
const ArtistPharrellWilliamsBackgroundImage = require('./../assets/img/artists/pharrell-williams/background.png');
const ArtistPharrellWilliamsAlbumNumberOneImage = require('./../assets/img/artists/pharrell-williams/album/number_one.png');
const ArtistPharrellWilliamsAlbumFreedomImage = require('./../assets/img/artists/pharrell-williams/album/freedom.png');
const ArtistPharrellWilliamsAlbumFrontinImage = require('./../assets/img/artists/pharrell-williams/album/frontin.png');
const ArtistPharrellWilliamsAlbumMyGirlImage = require('./../assets/img/artists/pharrell-williams/album/my-girl.jpeg');
const ArtistPharrellWilliamsAlbumTheNeptunesImage = require('./../assets/img/artists/pharrell-williams/album/the-neptunes.png');
const ArtistPharrellWilliamsAlbumHappyImage = require('./../assets/img/artists/pharrell-williams/album/happy.png');
const ArtistPharrellWilliamsFeaturedTracks1Image = require('./../assets/img/artists/pharrell-williams/featured-tracks/1.png');
const ArtistPharrellWilliamsFeaturedTracks2Image = require('./../assets/img/artists/pharrell-williams/featured-tracks/2.png');
const ArtistPharrellWilliamsNewRelease1Image = require('./../assets/img/artists/pharrell-williams/new-release/1.png');
const ArtistPharrellWilliamsNewRelease2Image = require('./../assets/img/artists/pharrell-williams/new-release/2.png');
const ArtistPharrellWilliamsSupportBackgroundImage = require('./../assets/img/artists/pharrell-williams/support-background.png');
const ArtistPharrellWilliamsSupportAvatarImage = require('./../assets/img/artists/pharrell-williams/support-avatar.png');
const ArtistPharrellWilliamsEventBackgroundImage = require('./../assets/img/artists/pharrell-williams/event-background.png');

const MixtapeEuroHouseImage = require('./../assets/img/mixtapes/euro-house.png');
const MixtapeKnightImage = require('./../assets/img/mixtapes/knight.png');
const MixtapeMoonLightImage = require('./../assets/img/mixtapes/moon-light.png');
const MixtapeRebelRockImage = require('./../assets/img/mixtapes/rebel-rock.png');

const GenersRebImage = require('./../assets/img/geners/reb.png');
const GenersHipHopImage = require('./../assets/img/geners/hip-hop.png');
const GenersSoulImage = require('./../assets/img/geners/soul.png');

const ArtistMickJaggerImage = require('./../assets/img/artists/mick-jagger/artist.png');
const ArtistBonoVoxImage = require('./../assets/img/artists/bono-vox/artist.png');
const ArtistRobinThickeImage = require('./../assets/img/artists/robin-thicke/artist.png');

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
  ArtistPharrellWilliamsBackgroundImage,
  ArtistPharrellWilliamsAlbumFreedomImage,
  ArtistPharrellWilliamsAlbumFrontinImage,
  ArtistPharrellWilliamsAlbumMyGirlImage,
  ArtistPharrellWilliamsAlbumTheNeptunesImage,
  ArtistPharrellWilliamsAlbumHappyImage,
  GenersRebImage,
  GenersHipHopImage,
  GenersSoulImage,
  ArtistPharrellWilliamsPlaylistImage,
  ArtistPharrellWilliamsFeaturedTracks1Image,
  ArtistPharrellWilliamsFeaturedTracks2Image,
  ArtistPharrellWilliamsNewRelease1Image,
  ArtistPharrellWilliamsNewRelease2Image,
  ArtistPharrellWilliamsSupportBackgroundImage,
  ArtistPharrellWilliamsSupportAvatarImage,
  ArtistPharrellWilliamsEventBackgroundImage,
  ArtistMickJaggerImage,
  ArtistBonoVoxImage,
  ArtistRobinThickeImage,
  BackgroundCircleBubblesOrangeImage
};
