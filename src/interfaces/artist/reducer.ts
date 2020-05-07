import {
  ArtistInterface,
  GalleryImageInterface,
  EventInterface,
  CommentInterface
} from './../';

export interface ArtistReducerType {
  artists: ArtistInterface[];
  event: EventInterface | null;
  currentGallery: GalleryImageInterface[] | null;
  currentArtist: ArtistInterface | null;
  fullScreenImage: string | null;
  fullScreenImageIndex: number;
  currentGalleryComments: CommentInterface[];
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}
