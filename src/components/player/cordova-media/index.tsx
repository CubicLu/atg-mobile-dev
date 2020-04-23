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
  setBufferingPlayer,
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
  seeking: boolean = false;
  hasControls: boolean = false;
  playOptions = {
    playAudioWhenScreenIsLocked: true,
    numberOfLoops: 1
  };

  componentDidUpdate(oldProps: Props): void {
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
        return this.actionSeekSong(oldProps.timeElapsed);
      case ActionType.UPDATE_MASTER_VOLUME:
        return this.updateVolume();
    }
  }
  actionLoadNextSong(): void {
    this.props.next && this.cordovaMedia(this.props.next!);
  }
  updateVolume(): void {
    this.mainSong?.setVolume(this.props.masterVolume);
  }
  actionSeekSong(oldElapsed: number): void {
    const newPosition = this.props.timeElapsed;
    if (newPosition >= this.duration) return;
    if (Math.abs(oldElapsed - this.elapsed) <= 2) return;
    console.log('main song changed to ', 'current: ', this.elapsed, oldElapsed);
    this.mainSong?.seekTo(this.props.timeElapsed * 1000);
    this.seeking = true;
    setTimeout((): boolean => (this.seeking = false), 200);
    setTimeout((): void => this.musicControlsUpdate(), 200);
  }
  actionSetPlaylist(): void {}

  actionPauseSong(): void {
    window.Media.list().forEach((song): void => song.pause());
    this.musicControlsUpdate();
  }
  actionResumeSong(): void {
    this.musicControlsUpdate();
    this.mainSong?.play(this.playOptions);
  }
  actionPlaySong(): void {
    //Play Song is called when I click next or previous;
    console.log('current Running');
    this.runningSong.forEach((song): void => {
      song.setFadeTime(3);
      song.setForceFadeOut(true);
    });
    const fadeIn = this.runningSong.length > 0;
    this.props.song && this.cordovaMedia(this.props.song!, fadeIn);
    this.props.next && this.cordovaMedia(this.props.next!, true, true);
    this.musicControlsUpdate();
    this.mainSong?.play(this.playOptions);
  }
  get mainSong(): MediaType | undefined {
    return (
      this.props.song?.id &&
      window.Media.getByMediaId(this.props.song.id.toString())
    );
  }
  get nextSong(): MediaType | undefined {
    return (
      this.props.next?.id &&
      window.Media.getByMediaId(this.props.next.id.toString())
    );
  }
  get runningSong(): MediaType[] {
    return window.Media.running();
  }
  isCurrent(media: MediaType): boolean {
    return media.getMediaId() === this.props.song?.id;
  }
  positionCallback(remaining, media: MediaType): void {
    const position = media.getPosition() || 0;
    this.isCurrent(media) &&
      !isNaN(position) &&
      this.seeking === false &&
      position <= this.duration &&
      Math.abs(this.props.timeElapsed - position) > 1 &&
      this.props.updateElapsed(position);
  }
  statusCallback(status: MediaStatusCallback, media: MediaType): void {
    switch (status) {
      case MediaStatusCallback.MEDIA_STARTING:
        console.log('Media Loaded', media.id, media.src);
        this.isCurrent(media) && this.props.setBufferingPlayer(true);
        break;
      case MediaStatusCallback.MEDIA_RUNNING:
        console.log('Media Running', media.id, media.src);
        this.isCurrent(media) && media.setVolume(this.props.masterVolume);
        this.isCurrent(media) && this.props.setBufferingPlayer(false);
        break;
      case MediaStatusCallback.MEDIA_PAUSED:
        console.log('Media Paused', media.id, media.src);
        break;
      case MediaStatusCallback.MEDIA_STOPPED:
        this.mediaCallbackEnded(media);
        break;
      case MediaStatusCallback.MEDIA_ENDED:
        this.mediaCallbackEnded(media);
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
      this.nextSong?.play(this.playOptions);
      this.props.toggleNextSong();
    }
  }
  get elapsed(): number {
    return Math.max(this.props.timeElapsed || 0, 0);
  }
  get duration(): number {
    return Math.max(this.mainSong?.getDuration() || this.duration || 300, 0);
  }
  cordovaMedia(
    song: SongInterface,
    fadeIn: boolean = true,
    fadeOut: boolean = true
  ): void {
    var instance = window.Media.getByMediaId(song.id.toString());
    //first check if already exists...
    if (instance) {
      instance.getPosition() > 0 && instance.seekTo(0);
      instance.setForceFadeOut(false);
      instance.setFadingOut(false);
      instance.setFadeIn(fadeIn);
      instance.setFadeOut(fadeOut);
      instance.setFadeTime(8);
      return;
    }
    const newInstance = new window.Media(
      song.url,
      null,
      null,
      (status): void => this.statusCallback(status, newInstance),
      (position): void => this.positionCallback(position, newInstance)
    ) as MediaType;
    newInstance.setMediaId(song.id);
    newInstance.setFadeIn(fadeIn);
    newInstance.setFadeOut(fadeOut);
    newInstance.setFadeTime(8);
  }
  mediaControlCreate(): void {
    const options = {
      dismissable: false,
      artist: this.props.song?.artist,
      track: this.props.song?.title,
      album: this.props.song?.album,
      cover: this.props.song?.cover,
      hasScrubbing: true,
      elapsed: this.elapsed,
      isPlaying: this.props.playing,
      duration: this.duration,
      ticker: `Now Playing ${this.props.song?.title}`,
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    };
    console.log('options', options);
    console.log('hasControls', this.hasControls);
    window.MusicControls.create(
      options,
      (): void => console.log('Music Controls created'),
      (): void => console.log('Music Controls error')
    );
    if (!this.hasControls) {
      window.MusicControls.subscribe(this.mediaControlEvents);
      window.MusicControls.listen();
      this.hasControls = true;
      console.log('hasControls', this.hasControls);
    }
  }
  mediaControlSync(): void {
    window.MusicControls.updateElapsed(
      {
        elapsed: this.elapsed,
        isPlaying: this.props.playing
      },
      (): void => console.log('Music Controls update success'),
      (): void => console.log('Music Controls update error')
    );
  }
  musicControlsUpdate(): void {
    setTimeout((): void => this.mediaControlCreate(), 50);
    setTimeout((): void => this.mediaControlSync(), 100);
  }
  mediaControlEvents(action: string): void {
    console.log('action', action);
    let message = '';
    try {
      message = JSON.parse(action).message;
    } catch (e) {
      return console.log(e);
    }

    switch (message) {
      case 'music-controls-next':
        console.log('mobile click on next');
        return this.props.nextSong();

      case 'music-controls-previous':
        console.log('mobile click on prev');
        return this.props.prevSong();

      case 'music-controls-pause':
        console.log('mobile click on pause');
        return this.props.pauseSong();

      case 'music-controls-play':
        console.log('mobile click on play');
        return this.props.resumeSong();

      case 'music-controls-destroy':
        console.log('mobile click on stop');
        return this.props.pauseSong();

      // External controls (iOS only)
      case 'music-controls-toggle-play-pause':
        console.log('ios click on play-pause');
        return this.props.playing
          ? this.props.pauseSong()
          : this.props.resumeSong();

      case 'music-controls-seek-to':
        console.log('seek to ' + JSON.parse(action).position);
        return this.mainSong?.seekTo(JSON.parse(action).position * 1000);

      // All media button events are listed below
      // Headset events (Android only) bluetooth and headset
      case 'music-controls-media-button':
        console.log('android click on media button');
        return this.props.pauseSong();

      case 'music-controls-headset-unplugged':
        console.log('headset unplugged');
        return this.props.pauseSong();

      case 'music-controls-headset-plugged':
        console.log('headset plugged');
        return this.props.pauseSong();

      default:
        return;
    }
  }

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
  setBufferingPlayer: (buffering: boolean) => void;
}
interface StateProps {
  playerAction?: string;
  firstIndex: number;
  masterVolume: number;
  playing: boolean;
  timeElapsed: number;
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
    canSkip,
    shuffle,
    repeat
  };
};
export default connect(mapStateToProps, {
  setBufferingPlayer,
  toggleNextSong,
  prevSong,
  nextSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsed,
  updateDuration
})(CordovaMediaComponent);
