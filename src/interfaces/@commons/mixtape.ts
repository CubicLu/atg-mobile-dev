import { PlaylistInterface } from "./../";

export interface MixtapeInterface {
    name: string;
    quantity: number;
    cover: string | undefined;
    playlist?: PlaylistInterface;
  }