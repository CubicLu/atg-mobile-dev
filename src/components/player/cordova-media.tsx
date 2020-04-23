/* eslint-disable no-undef */
import React from 'react';
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import {
  SongInterface,
  PlaylistInterface,
  MediaStatusCallback,
  MediaType,
  ActionType
} from '../../interfaces';
import {
  toggleNextSong,
  prevSong,
  nextSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsed
} from '../../actions/playerActions';

class CordovaMediaComponent extends React.Component<Props> {
  cordovaList: MediaType[] = [];
  seeking: boolean = false;
  hasControls: boolean = false;
  MEDIA_MSG = [
    'None',
    'Starting',
    'Running',
    'Paused',
    'Stopped',
    'Ended',
    'FadingOut'
  ];
  playOptions = {
    playAudioWhenScreenIsLocked: true,
    numberOfLoops: 1
  };

  componentDidMount(): void {
    (window as any).cordovaList = this.cordovaList;
  }
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
        return this.updateVolume();
    }
  }
  actionLoadNextSong(): void {
    this.props.next && this.cordovaMedia(this.props.next!);
  }
  updateVolume(): void {
    this.mainSong?.setVolume(this.props.masterVolume);
  }
  actionSeekSong(): void {
    if (Math.abs(this.mainSong!.getPosition() - this.props.timeElapsed) <= 1) {
      return;
    }
    this.seeking = true;
    this.mainSong?.seekTo(this.props.timeElapsed * 1000);
    setTimeout((): boolean => (this.seeking = false), 100);
    setTimeout((): void => this.musicControlsUpdate(), 100);
  }
  actionSetPlaylist(): void {
    this.cordovaList.forEach((s): void => s.pause());
    this.cordovaList = [];
  }
  actionPauseSong(): void {
    this.cordovaList.forEach((song): void => song.pause());
    this.musicControlsUpdate();
    this.nextSong?.seekTo(0); //reset to ensure
  }
  actionResumeSong(): void {
    this.musicControlsUpdate();
    this.mainSong?.play(this.playOptions);
  }
  actionPlaySong(): void {
    //Play Song is called when I click next or previous;
    this.runningSong.forEach((song): void => {
      song.setFadeTime(1);
      song.setForceFadeOut(true);
    });
    const fadeIn = this.runningSong.length > 0;
    this.props.song && this.cordovaMedia(this.props.song!, fadeIn);
    this.props.next && this.cordovaMedia(this.props.next!, true, true);
    this.musicControlsUpdate();
    this.mainSong?.play(this.playOptions);
  }
  get mainSong(): MediaType | undefined {
    return this.cordovaList.find((media): boolean => this.isCurrent(media));
  }
  get nextSong(): MediaType | undefined {
    return this.cordovaList.find((media): boolean => this.isNext(media));
  }
  get runningSong(): MediaType[] {
    const r = MediaStatusCallback.MEDIA_RUNNING;
    return this.cordovaList.filter((x): boolean => x.getMediaState() === r);
  }
  isCurrent(media: MediaType): boolean {
    return media?.getMediaId() === this.props.song?.id;
  }
  isNext(media: MediaType): boolean {
    return media?.getMediaId() === this.props.next?.id;
  }
  positionCallback(remaining: number, media: MediaType): void {
    this.isCurrent(media) &&
      this.seeking === false &&
      this.props.updateElapsed(media.getPosition());
  }
  statusCallback(status: MediaStatusCallback, media: MediaType): void {
    console.log('status', media.getMediaId(), this.MEDIA_MSG[status]);
    switch (status) {
      case MediaStatusCallback.MEDIA_STARTING:
        console.log('Media Loaded', media.id, media.src);
        break;
      case MediaStatusCallback.MEDIA_RUNNING:
        console.log('Media Running', media.id, media.src);
        break;
      case MediaStatusCallback.MEDIA_PAUSED:
        console.log('Media Paused', media.id, media.src);
        break;
      case MediaStatusCallback.MEDIA_STOPPED:
        this.mediaCallbackStopped(media);
        break;
      case MediaStatusCallback.MEDIA_ENDED:
        this.mediaCallbackEnded();
        break;
      case MediaStatusCallback.MEDIA_FADING_OUT:
        this.mediaCallbackFadingOut(media);
        break;
      default:
        break;
    }
  }
  cordovaStatus(): void {
    console.log(
      'Running:',
      this.cordovaList.filter(
        (x): boolean => x.getMediaState() === MediaStatusCallback.MEDIA_RUNNING
      ),
      '\n Starting:',
      this.cordovaList.filter(
        (x): boolean => x.getMediaState() === MediaStatusCallback.MEDIA_STARTING
      ),
      '\n Paused:',
      this.cordovaList.filter(
        (x): boolean => x.getMediaState() === MediaStatusCallback.MEDIA_PAUSED
      ),
      '\n Ended:',
      this.cordovaList.filter(
        (x): boolean => x.getMediaState() === MediaStatusCallback.MEDIA_ENDED
      ),
      '\n Stopped:',
      this.cordovaList.filter(
        (x): boolean => x.getMediaState() === MediaStatusCallback.MEDIA_STOPPED
      )
    );
  }
  mediaCallbackStopped(media: MediaType): void {
    console.log(media);
    // media.stop();
    // media.release();
  }
  mediaCallbackEnded(): void {
    this.runningSong!.length === 0 && this.props.pauseSong();
  }
  mediaCallbackFadingOut(media: MediaType): void {
    if (this.nextSong && media.getFadingOut()) {
      this.nextSong?.play(this.playOptions);
      this.props.toggleNextSong();
    }
  }
  cordovaMedia(
    song: SongInterface,
    fadeIn: boolean = true,
    fadeOut: boolean = true
  ): void {
    // eslint-disable-next-line
    var instance = this.cordovaList.find(x => x.getMediaId() === song.id);
    if (!instance) {
      //first check if already exists...
      //@ts-ignore
      instance = new Media(
        song.url,
        null,
        null,
        (status): void => this.statusCallback(status, instance!),
        (position): void => this.positionCallback(position, instance!)
      ) as MediaType;
      instance.setMediaId(song.id);
      this.cordovaList.push(instance);
    }
    instance.setFadeIn(fadeIn);
    instance.setFadeOut(fadeOut);
    instance.setVolume(this.props.masterVolume);
    instance.setFadeTime(5);
    instance.getPosition() > 0 && instance.seekTo(0);
  }
  mediaControlCreate(): void {
    const options = {
      dismissable: false,
      artist: this.props.song?.artist,
      track: this.props.song?.name,
      album: this.props.song?.album,
      cover: this.props.song?.cover,
      hasScrubbing: true,
      elapsed: this.props.timeElapsed,
      isPlaying: this.props.playing,
      duration: this.props.song?.duration,
      ticker: `Now Playing ${this.props.song?.name}`,
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    };
    console.log('options', options);
    console.log('hasControls', this.hasControls);
    //@ts-ignore
    MusicControls.create(
      options,
      (): void => console.log('Music Controls created'),
      (): void => console.log('Music Controls error')
    );
    if (!this.hasControls) {
      //@ts-ignore
      MusicControls.subscribe(this.mediaControlEvents);
      //@ts-ignore
      MusicControls.listen();
      this.hasControls = true;
      console.log('hasControls', this.hasControls);
    }
  }
  mediaControlSync(): void {
    //@ts-ignore
    MusicControls.updateElapsed(
      {
        elapsed: this.props.timeElapsed,
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
  toggleNextSong,
  prevSong,
  nextSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsed
})(CordovaMediaComponent);
