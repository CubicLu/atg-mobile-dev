import { Nullable } from './../../types';
import { ChannelInterface } from '.';
export interface RadioReducerType {
  readonly radioArtist: ChannelInterface | null;
  readonly loading: boolean;
  readonly errorMessage: Nullable<string>;
}
