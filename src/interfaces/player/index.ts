import { PlaylistInterface, SongInterface } from "./../";


  export interface SetPlaylistInterface {
    playlist: PlaylistInterface;
    song: SongInterface;
  }
  export interface SeekPositionInteface {
    seekTo: number;
    increase: boolean;
  }
  export interface PlaySongInterface {
    song: SongInterface;
    nextSong?: SongInterface;
  }

  

  export interface MediaType {
    getDuration(): number;
    getPosition(): number;
    getMediaState(): number;
    getState(): string;
    getByMediaId(id: string): any;
    list(): MediaType[];
    running(): any;
    getPaused(): boolean;
    getPlaying(): boolean;
    getEnded(): boolean;
    getLoading(): boolean;
    getStopped(): boolean;
    getFadeIn(): boolean;
    getFadeOut(): boolean;
    getFadingOut(): boolean;
    setFadeIn(value: boolean): void;
    setFadeOut(value: boolean): void;
  
    setForceFadeOut(value: boolean): void;
    setFadingOut(value: boolean): void;
  
    setFadeVolume(volume: number): void;
    setFadeInOut(): void;
    setFadeTime(seconds: number): void;
  
    getMediaId(): number;
    setMediaId(id: number): void;
  
    updatePosition(): void;
    updateAudioPosition(): void;
    getVolume(): number;
  
    play(iosPlayOptions?: any): void;
    pause(): void;
    release(): void;
    seekTo(position: number): void;
    setVolume(volume: number): void;
    stop(): void;
    id: string;
    src: string;
  }