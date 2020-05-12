import { PlaylistInterface } from './../';

export interface MixtapeInterface {
  readonly name: string;
  readonly quantity: number;
  readonly cover: string | undefined;
  readonly playlist?: PlaylistInterface;
}
