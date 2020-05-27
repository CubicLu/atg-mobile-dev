import { GradientColorsInterface } from './../';

export interface SongInterface {
  readonly id: number;
  readonly backgroundGradient?: GradientColorsInterface;
  readonly title: string;
  readonly album: string;
  readonly artist: string;
  readonly artistUrl?: string;
  readonly duration: number;
  readonly cover: string;
  readonly coverArtist?: string;
  readonly trackNumber: number;
  readonly url: string;
  readonly ISRC?: string;
  favorite?: boolean;
}
