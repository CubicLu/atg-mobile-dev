import { GradientColorsInterface } from './../';

export interface SongInterface {
  id: number;
  backgroundGradient?: GradientColorsInterface;
  title: string;
  album: string;
  artist: string;
  duration: number;
  cover: string;
  coverArtist?: string;
  trackNumber: number;
  url: string;
  ISRC?: string;
  favorite?: boolean;
}
