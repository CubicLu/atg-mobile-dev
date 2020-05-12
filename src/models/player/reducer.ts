import { SongInterface, PlaylistInterface } from '../';

export interface PlayerReducerType {
  playerAction?: string;
  expanded: boolean;
  starting: boolean;
  fadingOut: boolean;
  playing: boolean;
  paused: boolean;
  stopped: boolean;
  canSkip: boolean;
  shuffle: boolean;
  repeat: boolean;
  masterVolume: number;
  timeElapsed: number;
  duration: number;
  song?: SongInterface;
  next?: SongInterface;
  playlist?: PlaylistInterface;
  firstIndex: number;
}
