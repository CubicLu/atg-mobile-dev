import { SongInterface } from "./../";

export interface PlaylistInterface {
    name: string;
    id: number;
    source: 'radio' | 'artist' | 'playlist' | 'mixtape';
    sourceId: number;
    cover: string;
    items: SongInterface[];
    owner: string;
    color1?: string;
    color2?: string;
  }