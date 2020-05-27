import { SongInterface } from './../';

export interface PlaylistInterface {
  readonly name: string;
  readonly id: number;
  readonly source: 'radio' | 'artist' | 'playlist' | 'mixtape';
  readonly sourceId: number | string;
  readonly cover: string;
  readonly items: SongInterface[];
  readonly owner: string;
  readonly color1?: string;
  readonly color2?: string;
}
