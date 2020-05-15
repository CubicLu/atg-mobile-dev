import {
  ArtistInterface,
  GalleryImageInterface,
  EventInterface,
  CommentInterface,
  SupportLevelsInterface,
  VideosBetaInterface,
  ArtistBetaInterface
} from 'models';
import { Nullable } from 'types';

export interface ArtistReducerType {
  readonly artists: ArtistInterface[];
  readonly event: Nullable<EventInterface>;
  readonly videos: Nullable<VideosBetaInterface[]>;
  readonly currentGallery: Nullable<GalleryImageInterface[]>;
  readonly currentArtist: Nullable<ArtistInterface>;
  readonly fullScreenImage: Nullable<string>;
  readonly fullScreenImageIndex: number;
  readonly currentGalleryComments: CommentInterface[];
  readonly loading: boolean;
  readonly successMessage: Nullable<string>;
  readonly errorMessage: Nullable<string>;
  readonly supportLevels: SupportLevelsInterface[];
  readonly artist: Nullable<ArtistBetaInterface>;
}
