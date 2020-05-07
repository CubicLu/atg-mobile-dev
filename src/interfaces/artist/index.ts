import {
  GradientColorsInterface,
  EventInterface,
  RadioInterface,
  VideoInterface
} from './../';

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

export interface ArtistCoverInterface {
  main: string | undefined;
  background: string | undefined;
  event: string | undefined;
  biography: string | undefined;
  deepDive: string | undefined;
  dashboard?: string;
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

export interface GalleryImageInterface {
  image: string;
}

export interface GalleryIdInterface {
  galleryId: number;
}

export interface GalleryImageIndexInterface {
  index: number;
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

export interface ArtistSupportImagesInterface {
  background: string | undefined;
  avatar: string | undefined;
}
