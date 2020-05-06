import React from 'react';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import {
  SongInterface,
  PlaylistInterface,
  MediaType,
  PlayerActionType
} from '../../../interfaces';
import {
  MediaStatusCallback
} from '../../../types';
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

const FADEOUT_NEXT = 1.5; //fadeout time when click on next song
const FADEOUT_DEFAULT = 5; // fadeout when song ends naturally
const MUSIC_CONTROLS_DELAY = 25; //time in ms - needed to reflect update on android/ios

class CordovaMediaComponent extends React.Component<Props> {
  playOptions = {
    playAudioWhenScreenIsLocked: true,
    numberOfLoops: 1
  };
  activeMusicControls = false;

  componentDidUpdate(): void {
    switch (this.props.playerAction) {
      case PlayerActionType.SET_PLAYLIST:
        return this.actionSetPlaylist();
      case PlayerActionType.PLAY_SONG:
        return this.actionPlaySong();
      case PlayerActionType.RESUME_SONG:
        return this.actionResumeSong();
      case PlayerActionType.PAUSE_SONG:
        return this.actionPauseSong();
      case PlayerActionType.LOAD_NEXT_SONG:
        return this.actionLoadNextSong();
      case PlayerActionType.SEEK_TO_SONG:
        return this.actionSeekSong();
      case PlayerActionType.UPDATE_MASTER_VOLUME:
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
    if (Math.abs(this.elapsed - seek) < 1.5) return;
    this.mainSong.seekTo(this.elapsed * 1000);
    this.updateElapsedMusicControls();
  }
  actionSetPlaylist(): void {
    console.log('Setplaylist, first song to play: ', this.props.song!.title);
    this.actionPlaySong();
  }

  actionPauseSong(): void {
    window.Media.list().forEach((song): void => song.pause());
    this.updatePlayingMusicControls();
  }
  actionResumeSong(): void {
    if (!this.props.song) return;
    this.mainSong!.play(this.playOptions);
    this.updateElapsedMusicControls();
  }
  actionPlaySong(): void {
    //Play Song is called when I click next or previous;
    this.runningSong.forEach((song): void => {
      if (song.getPosition() >= 2) {
        song.setFadeTime(FADEOUT_NEXT);
        song.setForceFadeOut(true);
      } else {
        song.pause();
      }
    });
    const song = this.props.song!;
    const one = song && this.cordovaMedia(song, this.hasRunningSongs);
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
  get hasRunningSongs(): boolean {
    return window.Media.running().length > 0;
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
        this.updateElapsedMusicControls();
        break;
      case MediaStatusCallback.MEDIA_STOPPED:
        this.mediaCallbackEnded(media);
        this.updateElapsedMusicControls();
        break;
      case MediaStatusCallback.MEDIA_ENDED:
        this.mediaCallbackEnded(media);
        this.updateElapsedMusicControls();
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

    if (this.hasRunningSongs === false) {
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
      instance.setFadeTime(FADEOUT_DEFAULT);
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
    newInstance.setFadeTime(FADEOUT_DEFAULT);
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

    window.MusicControls.create(options, null, null);
    if (this.activeMusicControls) return;
    window.MusicControls.subscribe(this.mediaControlEvents);
    window.MusicControls.listen();
    this.activeMusicControls = true;
  }

  updatePlayingMusicControls(): void {
    setTimeout(
      (): void => window.MusicControls.updateIsPlaying(this.props.playing),
      MUSIC_CONTROLS_DELAY
    );
  }
  updateElapsedMusicControls(): void {
    setTimeout((): void => {
      const opt = { elapsed: this.elapsed, isPlaying: this.props.playing };
      window.MusicControls.updateElapsed(opt, null, null);
    }, MUSIC_CONTROLS_DELAY);
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
