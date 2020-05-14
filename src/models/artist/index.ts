import {
  GradientColorsInterface,
  EventInterface,
  RadioInterface,
  VideoInterface
} from './../';

export interface ArtistInterface {
  readonly bandMembers?: BandMemberInterface[];
  readonly tiles?: AlbumInterface[];
  readonly cover: ArtistCoverInterface;
  readonly name: string;
  readonly avatar?: string;
  readonly support?: boolean;
  readonly username: string;
  readonly backgroundGradient?: GradientColorsInterface | null;
  readonly featuredTracks?: FeaturedTrackInterface[];
  readonly newReleases?: NewRealeseInterface[];
  readonly events?: EventInterface[];
  readonly radio?: RadioInterface[];
  readonly supportImages?: ArtistSupportImagesInterface;
  readonly discography?: DiscographyInterface[];
  readonly supportArtistFans?: ArtistInterface[];
  readonly similarArtist?: ArtistInterface[];
  readonly gallery?: GalleryInterface[];
  readonly biography?: BiographyInterface[];
  readonly videos?: {
    readonly recents: VideoInterface[];
    readonly showcase: VideoInterface[];
  };
}

export interface ArtistCoverInterface {
  readonly main: string | undefined;
  readonly background: string | undefined;
  readonly event: string | undefined;
  readonly biography: string | undefined;
  readonly gateway: string | undefined;
  readonly deepDive: string | undefined;
  readonly dashboard?: string;
  readonly videoCover?: string;
}

export interface DiscographyInterface {
  readonly albumId: number;
  readonly cover: string | undefined;
  readonly name: string;
}

export interface GalleryInterface {
  readonly cover: string | undefined;
  readonly name: string;
  readonly quantity: number;
  readonly items: AlbumInterface[][];
}

export interface AlbumInterface {
  readonly image: string | undefined;
  readonly name?: string;
  readonly cols?: number;
  readonly redirectUrl?: string;
}

export interface ReadMoreInterface {
  readonly title?: string;
  readonly items: AlbumInterface[];
}

export interface BiographyInterface {
  readonly chapter: number;
  readonly template: string;
  readonly title: string;
  readonly titleColor: string;
  readonly headerColor: string;

  readonly name: string;
  readonly featureColor: string;
  readonly subtitle?: string;

  readonly accessLevel: number;

  readonly headline: string;
  readonly headlineColor: any;

  readonly nameHeadline: string;
  readonly cover: string;
  readonly skyline?: string;
  readonly skylineBefore?: boolean;
  readonly byline?: string;
  readonly leadParagraph?: string;
  readonly textColor: string;
  readonly items?: AlbumInterface[];
  readonly readMore?: ReadMoreInterface;
}

export interface FeaturedTrackInterface {
  readonly song: string;
  readonly id: number;
}

export interface NewRealeseInterface {
  readonly image: string | undefined;
  readonly video: string | undefined;
  readonly time: number | string;
  readonly title: string;
  readonly artist: ArtistInterface;
}

export interface GalleryImageInterface {
  readonly image: string;
}

export interface GalleryIdInterface {
  readonly galleryId: number;
}

export interface GalleryImageIndexInterface {
  readonly index: number;
}

export interface GalleryImageInterface {
  readonly image: string;
}

export interface GalleryIdInterface {
  readonly galleryId: number;
}

export interface GalleryImageIndexInterface {
  readonly index: number;
}

export interface ArtistSupportImagesInterface {
  readonly background: string | undefined;
  readonly avatar: string | undefined;
}
export interface BandMemberInterface {
  readonly image: string;
  readonly name: string;
  readonly redirectUrl?: string;
}
