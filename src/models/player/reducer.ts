import { SongInterface, PlaylistInterface } from '../';

export interface PlayerReducerType {
  readonly playerAction?: string;
  readonly expanded: boolean;
  readonly starting: boolean;
  readonly fadingOut: boolean;
  readonly playing: boolean;
  readonly paused: boolean;
  readonly stopped: boolean;
  readonly canSkip: boolean;
  readonly shuffle: boolean;
  readonly repeat: boolean;
  readonly masterVolume: number;
  readonly timeElapsed: number;
  readonly duration: number;
  readonly song?: SongInterface;
  readonly next?: SongInterface;
  readonly playlist?: PlaylistInterface;
  readonly firstIndex: number;
}
