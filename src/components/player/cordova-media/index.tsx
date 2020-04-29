import React from 'react';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import {
  SongInterface,
  PlaylistInterface,
  MediaStatusCallback,
  MediaType,
  ActionType
} from '../../../interfaces';
import {
  setStartingPlayer,
  toggleNextSong,
  prevSong,
  nextSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsed,
  updateDuration
} from '../../../actions/playerActions';

declare global {
  interface Window {
    MusicControls: any;
    Media: MediaType | any;
  }
}

class CordovaMediaComponent extends React.Component<Props> {
  playOptions = {
    playAudioWhenScreenIsLocked: true,
    numberOfLoops: 1
  };
  activeMusicControls = false;

  componentDidUpdate(): void {
    switch (this.props.playerAction) {
      case ActionType.SET_PLAYLIST:
        return this.actionSetPlaylist();
      case ActionType.PLAY_SONG:
        return this.actionPlaySong();
      case ActionType.RESUME_SONG:
        return this.actionResumeSong();
      case ActionType.PAUSE_SONG:
        return this.actionPauseSong();
      case ActionType.LOAD_NEXT_SONG:
        return this.actionLoadNextSong();
      case ActionType.SEEK_TO_SONG:
        return this.actionSeekSong();
      case ActionType.UPDATE_MASTER_VOLUME:
        return this.updateMediaVolume();
    }
  }
  actionLoadNextSong(): void {
    this.props.next && this.cordovaMedia(this.props.next!);
  }
  updateMediaVolume(): void {
    if (!this.props.song) return;
    this.mainSong!.setVolume(this.props.masterVolume);
  }
  actionSeekSong(): void {
    if (!this.mainSong) return;
    const seek = Math.trunc(this.mainSong.getPosition());
    if (Math.abs(this.elapsed - seek) <= 2) return;

    this.mainSong.seekTo(this.props.timeElapsed * 1000);
    this.updateMusicControls();
  }
  actionSetPlaylist(): void {
    console.log('Setplaylist, first song to play: ', this.props.song!.title);
    this.actionPlaySong();
  }

  actionPauseSong(): void {
    window.Media.list().forEach((song): void => song.pause());
    this.updateMusicControls();
  }
  actionResumeSong(): void {
    if (!this.props.song) return;
    this.mainSong!.play(this.playOptions);
    this.updateMusicControls();
  }
  actionPlaySong(): void {
    //Play Song is called when I click next or previous;
    const fadeIn = this.runningSong.length > 0;
    this.runningSong.forEach((song): void => {
      song.setFadeTime(3);
      song.setForceFadeOut(true);
    });
    const one = this.props.song! && this.cordovaMedia(this.props.song!, fadeIn);
    one.play(this.playOptions);

    this.props.next && this.cordovaMedia(this.props.next!, true);
    this.createMusicControls();
  }
  get mainSong(): MediaType | undefined {
    return window.Media.getByMediaId(this.props.song!.id.toString());
  }
  get nextSong(): MediaType | undefined {
    return (
      this.props.next &&
      window.Media.getByMediaId(this.props.next.id.toString())
    );
  }
  get runningSong(): MediaType[] {
    return window.Media.running();
  }
  isCurrent(media: MediaType): boolean {
    if (!this.props.song) return false;
    return media.getMediaId() === this.props.song.id;
  }
  positionCallback(remaining, media: MediaType): void {
    const position = media.getPosition();
    this.isCurrent(media) &&
      Math.abs(this.props.timeElapsed - position) > 1 &&
      this.props.updateElapsed(position);
  }
  updateSongDuration(media: MediaType, first = true): void {
    const duration = media.getDuration();
    if (media.getDuration() >= 0) {
      this.props.updateDuration(duration);
    } else if (first) {
      setTimeout((): void => this.updateSongDuration(media, false), 300);
    }
    console.log('updateSongDuration', duration, 'first', first);
  }
  statusCallback(status: MediaStatusCallback, media: MediaType): void {
    switch (status) {
      case MediaStatusCallback.MEDIA_STARTING:
        if (!this.isCurrent(media)) return;
        console.log('Media Downloading', media.id, media.src);
        this.props.setStartingPlayer(true);
        break;
      case MediaStatusCallback.MEDIA_RUNNING:
        if (!this.isCurrent(media)) return;
        media.setVolume(this.props.masterVolume);
        this.updateSongDuration(media);
        this.createMusicControls();
        this.props.setStartingPlayer(false);
        break;
      case MediaStatusCallback.MEDIA_PAUSED:
        console.log('Media Paused', media.id, media.src);
        this.updateMusicControls();
        break;
      case MediaStatusCallback.MEDIA_STOPPED:
        this.mediaCallbackEnded(media);
        this.updateMusicControls();
        break;
      case MediaStatusCallback.MEDIA_ENDED:
        this.mediaCallbackEnded(media);
        this.updateMusicControls();
        break;
      case MediaStatusCallback.MEDIA_FADING_OUT:
        console.log('Media FadingOut', media.id, media.src);
        this.mediaCallbackFadingOut(media);
        break;
      default:
        break;
    }
  }
  mediaCallbackEnded(media): void {
    console.log('song finished and ended', media.getMediaId(), media.src);

    if (this.runningSong!.length === 0) {
      console.log('no Running songs! pausing player');
      this.props.pauseSong();
    }
  }

  fadingOut: boolean = false;
  mediaCallbackFadingOut(media: MediaType): void {
    if (this.nextSong && media.getFadingOut() && !this.fadingOut) {
      this.fadingOut = true;
      setTimeout((): boolean => (this.fadingOut = false), 1000); //ensure one fading
      this.props.nextSong && this.nextSong.play(this.playOptions);
      this.props.toggleNextSong();
    }
  }
  get elapsed(): number {
    return Math.max(this.props.timeElapsed || 0, 0);
  }
  cordovaMedia(
    song: SongInterface,
    fadeIn: boolean = true,
    fadeOut: boolean = true
  ): MediaType {
    var instance: MediaType = window.Media.getByMediaId(song.id.toString());
    //first check if already exists...
    if (instance) {
      instance.getPosition() > 0 && instance.seekTo(0);
      instance.setForceFadeOut(false);
      instance.setFadingOut(false);
      instance.setFadeIn(fadeIn);
      instance.setFadeOut(fadeOut);
      instance.setFadeTime(8);
      return instance;
    }
    const newInstance = new window.Media(
      song.url,
      null,
      (e): void => console.log('error ', e),
      (status): void => this.statusCallback(status, newInstance),
      (position): void => this.positionCallback(position, newInstance)
    ) as MediaType;
    newInstance.setMediaId(song.id);
    newInstance.setFadeIn(fadeIn);
    newInstance.setFadeOut(fadeOut);
    newInstance.setFadeTime(8);
    return newInstance;
  }
  createMusicControls(): void {
    if (!this.props.song) return;
    const options = {
      dismissable: false,
      artist: this.props.song.artist,
      track: this.props.song.title,
      album: this.props.song.album,
      cover: this.props.song.cover,
      hasScrubbing: true,
      elapsed: this.elapsed,
      isPlaying: this.props.playing,
      duration: this.props.duration,
      ticker: `Now Playing ${this.props.song.title}`,
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    };

    window.MusicControls.create(
      options,
      (): void => {},
      (e): void => console.log('Music Controls error', e)
    );
    if (this.activeMusicControls) {
      return;
    } else {
      window.MusicControls.subscribe(this.mediaControlEvents);
      window.MusicControls.listen();
      this.activeMusicControls = true;
    }
  }

  updateMusicControls(): void {
    window.MusicControls.updateElapsed(
      {
        elapsed: this.elapsed,
        isPlaying: this.props.playing
      },
      (): void => {},
      (e): void => console.log('Music Controls error', e)
    );
  }
  mediaControlEvents = (action: string): void => {
    if (!action) return;
    const { message } = JSON.parse(action);
    switch (message) {
      case 'music-controls-next':
        return this.props.nextSong();

      case 'music-controls-previous':
        return this.props.prevSong();

      case 'music-controls-pause':
        return this.props.pauseSong();

      case 'music-controls-play':
        return this.props.resumeSong();

      case 'music-controls-destroy':
        return this.props.pauseSong();

      // External controls (iOS only)
      case 'music-controls-toggle-play-pause':
        return this.props.playing
          ? this.props.pauseSong()
          : this.props.resumeSong();

      case 'music-controls-seek-to':
        return (
          this.props.song &&
          this.mainSong!.seekTo(JSON.parse(action).position * 1000)
        );

      case 'music-controls-media-button':
        return this.props.pauseSong();

      case 'music-controls-headset-unplugged':
        return this.props.pauseSong();

      case 'music-controls-headset-plugged':
        return this.props.pauseSong();

      default:
        return;
    }
  };

  render(): React.ReactNode {
    return null;
  }
}
interface DispatchProps {
  toggleNextSong: () => void;
  prevSong: () => void;
  nextSong: () => void;
  pauseSong: () => void;
  resumeSong: () => void;
  stopSong: () => void;
  updateElapsed: (time: number) => void;
  updateDuration: (time: number) => void;
  setStartingPlayer: (starting: boolean) => void;
}
interface StateProps {
  playerAction?: string;
  firstIndex: number;
  masterVolume: number;
  playing: boolean;
  timeElapsed: number;
  duration: number;
  paused: boolean;
  canSkip: boolean;
  shuffle: boolean;
  repeat: boolean;
  song?: SongInterface;
  next?: SongInterface;
  playlist?: PlaylistInterface;
}
interface Props extends StateProps, DispatchProps {}
const mapStateToProps = ({ player }: ApplicationState): StateProps => {
  const {
    masterVolume,
    playerAction,
    firstIndex,
    playing,
    timeElapsed,
    duration,
    paused,
    song,
    next,
    playlist,
    canSkip,
    shuffle,
    repeat
  } = player;

  return {
    masterVolume,
    playerAction,
    firstIndex,
    playing,
    paused,
    song,
    next,
    playlist,
    timeElapsed,
    duration,
    canSkip,
    shuffle,
    repeat
  };
};
export default connect(mapStateToProps, {
  setStartingPlayer,
  toggleNextSong,
  prevSong,
  nextSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsed,
  updateDuration
})(CordovaMediaComponent);
