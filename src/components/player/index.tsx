import React from 'react';
import moment from 'moment';
import {
  PauseIcon,
  StarIcon,
  NextIcon,
  Header,
  ButtonSupport,
  BackgroundImage
} from './../../components';
import {
  createGesture,
  GestureConfig,
  Gesture,
  createAnimation,
  IonRange,
  IonRouterLink
} from '@ionic/react';
import { connect } from 'react-redux';
import {
  setPlaylistPlayer,
  setRadioPlaylistPlayer,
  togglePlayer,
  toggleShuffle,
  toggleRepeat,
  playSong,
  favoriteSong,
  pauseSong,
  nextSong,
  prevSong,
  resumeSong,
  updateElapsed
} from './../../actions/playerActions';
import { ApplicationState } from '../../reducers';
import { PlayerReducerType, SongInterface } from '../../interfaces';
import {
  PlayButton,
  NextButton,
  PrevButton,
  PauseButton,
  MixTapeButton,
  ShareButton,
  ShuffleButton,
  LikeButton,
  RepeatButton,
  VolumeMuteButton,
  VolumeButton
} from '../icon/player';
import { PlayIcon } from '../icon';
import VigilAnimator from '../../utils/animateFrame';
import { shadowTitle } from '../../utils';

interface StateProps {
  player: PlayerReducerType;
}
interface DispatchProps {
  setPlaylistPlayer: () => void;
  setRadioPlaylistPlayer: () => void;
  togglePlayer: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  playSong: (song: SongInterface) => void;
  favoriteSong: () => void;
  pauseSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
  resumeSong: () => void;
  updateElapsed: (time: number) => void;
}
interface Props extends StateProps, DispatchProps {}

class PlayerComponent extends React.Component<Props> {
  audio: HTMLAudioElement | undefined;
  pullPlayerGesture: Gesture | undefined;
  pullingInProgress: boolean = false;
  expansePlayerAnimation: Animation | any;
  expansionInProgress: boolean = false;
  lastY?: number;

  componentDidMount(): void {
    this.createPlayerGesture();
    this.createPlayerAnimation();
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.player.song == null && nextProps.player.playlist != null) {
      this.playNewAudio(nextProps.player.playlist.items[0]);
    }
  }

  createPlayerGesture(): void {
    const mini = document.querySelector('#player');
    if (!mini) return;
    const gestureConfigMini: GestureConfig = {
      el: mini,
      direction: 'y',
      gestureName: 'playerMove',
      gesturePriority: 20,
      passive: true,
      onEnd: this.playerSwipe,
      onMove: this.playerPull
    };
    this.pullPlayerGesture = createGesture(gestureConfigMini);
    this.pullPlayerGesture.enable();
  }
  createPlayerAnimation(): void {
    const player = document.querySelector('#full-player');
    if (!player) return;
    this.expansePlayerAnimation = createAnimation()
      .addElement(player)
      .duration(400)
      .easing('ease-in')
      .fromTo('transform', 'translate3d(0, 100%, 0)', 'translate3d(0, 0, 0)');
  }

  playerSwipe = (gesture: any): void => {
    const validSwipeUp = !this.props.player.expanded && gesture.deltaY < -250;
    this.pullingInProgress = false;
    if (!this.props.player.expanded && !validSwipeUp) {
      this.elasticBack();
      return;
    }

    const validSwipeDown = this.props.player.expanded && gesture.deltaY > 100;
    if (validSwipeDown || validSwipeUp) this.togglePlayer(null);
  };

  elasticBack(): void {
    new VigilAnimator({
      element: document.getElementById('a')!,
      axisY: Math.abs(this.lastY!),
      axisX: 0,
      duration: 500,
      direction: 'normal'
    }).elasticPlay();
  }

  async togglePlayer(e: any): Promise<void> {
    if (this.expansionInProgress) return;
    e?.preventDefault();
    const direction = this.props.player.expanded ? 'reverse' : 'normal';
    this.expansionInProgress = true;
    this.elasticBack();
    if (direction === 'normal') this.props.togglePlayer();
    await this.expansePlayerAnimation.direction(direction).play();
    this.expansionInProgress = false;
    if (direction === 'reverse') this.props.togglePlayer();
  }

  pauseSong(): void {
    if (this.audio) {
      this.audio.pause();
      this.props.pauseSong();
    }
  }
  resumeSong(): void {
    if (this.audio) this.audio.play();

    const hasSong = this.props.player.song;
    if (hasSong) this.props.playSong(this.props.player.song!);
    else this.nextSong();
  }

  playNewAudio(song: SongInterface): void {
    this.audio && this.pauseSong();
    this.audio = new Audio(song.url);
    if (this.audio) this.audio.play();
    this.props.playSong(song);
    this.audio.onended = (): void => this.nextSong();
    this.audio.ontimeupdate = (): void => {
      this.props.updateElapsed(this.audio?.currentTime || 0);
    };
  }
  nextSong(): void {
    if (!this.props.player.playlist) return;
    let playlist = this.props.player.playlist?.items;
    const song = this.props.player.song;
    let currentIndex = playlist.findIndex((x: any): any => x.id === song?.id);

    currentIndex === -1 || currentIndex === playlist.length - 1
      ? this.playNewAudio(playlist[0])
      : this.playNewAudio(playlist[currentIndex + 1]);
  }

  prevSong(): void {
    if (!this.props.player.playlist) return;
    let playlist = this.props.player.playlist?.items;
    const song = this.props.player.song;
    let currentIndex = playlist.findIndex((x: any): any => x.id === song?.id);

    currentIndex === 0
      ? this.playNewAudio(playlist[playlist.length - 1])
      : this.playNewAudio(playlist[currentIndex - 1]);
  }

  playerPull = (gesture: any): void => {
    if (!this.pullingInProgress && window.innerHeight - gesture.startY > 110) {
      return;
    }
    const svg = document.getElementById('a');
    if (!svg) return;
    this.pullingInProgress = true;
    if (gesture.deltaY > -250 && gesture.deltaY < 0) {
      this.lastY = gesture.deltaY;
      svg.setAttribute(
        'd',
        `M 0 10 c 200-${Math.abs(gesture.deltaY)},400,0,400,0`
      );
    }
  };

  miniPlayer(): React.ReactNode {
    const { playing, timeElapsed, song } = this.props.player;
    const disabled = !song;

    return (
      <>
        {song && (
          <div className="progress">
            <IonRange
              className="bar"
              value={timeElapsed * 3.333}
              onIonChange={(e: any): void => console.log(e.detail.value)}
            />
          </div>
        )}

        <div className="cover">
          <div
            className="img"
            style={{
              backgroundSize: 'cover',
              backgroundPositionY: 'center',
              background: disabled ? '#1a0922cc' : `url(${song?.cover})`
            }}
          >
            {!disabled && (
              <div className="icon">
                {playing ? (
                  <button
                    disabled={!song}
                    className="mini-player-toggle"
                    onClick={(): void => this.pauseSong()}
                  >
                    <PauseIcon color={'#fff'} opacity={0.75} />
                  </button>
                ) : (
                  <button
                    disabled={!song}
                    className="mini-player-toggle"
                    onClick={(): void => this.resumeSong()}
                  >
                    <PlayIcon stroke={'#fff'} opacity={0.75} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="row mini-bar">
          <div
            className="mini-bar-left"
            onClick={(e): Promise<void> => this.togglePlayer(e)}
          />
          <div className="no-padding mini-bar  mini-bar-content">
            <div
              onClick={(e): Promise<void> => this.togglePlayer(e)}
              className="infos"
            >
              <div className="song f7">{song?.name}</div>
              <div className="artist f7 neue">{song?.artist}</div>
            </div>
            <div className="mini-right-buttons">
              <div className="mini-player-button">
                <button
                  disabled={disabled}
                  onClick={(): void => this.props.favoriteSong()}
                >
                  <StarIcon />
                </button>
              </div>
              <div className="mini-player-button">
                <button
                  disabled={disabled}
                  onClick={(): void => this.nextSong()}
                >
                  <NextIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  mainControls(): React.ReactNode {
    const { playing, timeElapsed, song } = this.props.player;
    return (
      <div className="main-controls fluid">
        <div className="player-progress">
          <IonRange
            className="bar"
            value={timeElapsed * 3.333}
            onIonChange={(e: any): void => console.log(e.detail.value)}
          />

          <div className="elapsed f6">
            <span>
              {moment()
                .minutes(0)
                .second(timeElapsed)
                .format('m:ss')}
            </span>
            <span>
              {moment()
                .minutes(0)
                .second(song?.duration || 0)
                .format('m:ss')}
            </span>
          </div>
        </div>

        <div className="player-three-buttons">
          <button
            disabled={!song}
            className="player-button"
            onClick={(): void => this.prevSong()}
          >
            <PrevButton />
          </button>

          {playing && (
            <button
              disabled={!song}
              className="player-button"
              onClick={(): void => this.pauseSong()}
            >
              <PauseButton />
            </button>
          )}
          {!playing && (
            <button
              disabled={!song}
              className="player-button"
              onClick={(): void => this.resumeSong()}
            >
              <PlayButton />
            </button>
          )}

          <button
            disabled={!song}
            className="player-button"
            onClick={(): void => this.nextSong()}
          >
            <NextButton />
          </button>
        </div>

        <div className="player-volume mt-4 flex-align-items-center">
          <VolumeMuteButton />
          <IonRange
            value={7}
            onIonChange={(e: any): void => console.log(e.detail.value)}
          />
          <VolumeButton />
        </div>
      </div>
    );
  }

  bottomTiles(): React.ReactNode {
    return (
      <div className="bottom-tiles fluid">
        <div
          className="tile"
          onClick={(): void => this.props.setPlaylistPlayer()}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/happy.png'
          )}
        >
          <span className="f6">Liner Notes</span>
        </div>

        <div
          className="tile"
          onClick={(): void => this.props.setRadioPlaylistPlayer()}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/gallery/untitled-folder-1/cover.png'
          )}
        >
          <span className="f6">Community</span>
        </div>
        <div
          className="tile"
          onClick={(): Promise<void> => this.togglePlayer(null)}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/number_one.png'
          )}
        >
          <IonRouterLink
            routerLink="'/track/default/2/1'"
            routerDirection="forward"
          >
            <div>
              <span className="f6">Artist Home</span>
            </div>
          </IonRouterLink>
        </div>
      </div>
    );
  }

  fullPlayerButtons(): React.ReactNode {
    return (
      <div id="player-navbar-buttons" className="player-navbar-buttons">
        <div className="navbar-button space-between">
          <ShuffleButton />
          <span className="f8 l1 mb-05">Shuffle</span>
        </div>
        <div className="navbar-button space-between">
          <RepeatButton />
          <span className="f8 l1 mb-05">Repeat</span>
        </div>
        <div className="navbar-button space-between">
          <LikeButton />
          <span className="f8 l1 mb-05">Like</span>
        </div>
        <div className="navbar-button space-between">
          <MixTapeButton />
          <span className="f8 l1 mb-05">Mixtape</span>
        </div>
        <div className="navbar-button space-between">
          <ShareButton />
          <span className="f8 l1 mb-05">Share</span>
        </div>
      </div>
    );
  }

  fullPlayer(): React.ReactNode {
    const { song, playlist } = this.props.player;
    return (
      <>
        <Header
          leftBackButton={false}
          rightInfoButton={true}
          rightInfoOnClick={(): void => {}}
          centerContent={<ButtonSupport artist={null} />}
          leftMinimizeButton={true}
          leftMinimizeOnClick={(e): Promise<void> => this.togglePlayer(e)}
        />
        <div id="expanded-body" className="space-between h-100">
          <div className="m-4 mb-2 player-upper-half space-between">
            <div
              className="image radius"
              style={{
                background: `url(${song?.cover})`,
                backgroundSize: 'cover'
              }}
            />
            <div className="cover-infos mt-2">
              <div className="f5 l2 mt-0">{song?.name}&nbsp;</div>
              <div className="f6 l1">{song?.artist}&nbsp;</div>
              <div className="text-10 l2">&nbsp;</div>
              <div className="f6 l1">Source: {playlist?.name}&nbsp;</div>
            </div>
          </div>

          <div className="flex compass south center m-4 mt-2 mb-2">
            {this.mainControls()}
          </div>
          {this.bottomTiles()}
        </div>
      </>
    );
  }

  componentDidUpdate(): void {
    const { paused } = this.props?.player;
    if (paused && this.audio) {
      this.audio.pause();
    }
    if (!paused && this.audio) {
      this.audio.play();
    }
  }

  render(): React.ReactNode {
    const { expanded } = this.props.player;
    const active = this.props.player.song ? 'active' : '';
    if (!this.expansePlayerAnimation) this.createPlayerAnimation();

    return (
      <>
        <div id="full-player" className="full-player">
          <BackgroundImage
            gradient={`180deg,#aed8e5,#039e4a`}
            backgroundTop
            backgroundTopDark={true}
            backgroundTopOpacity={0.2}
            backgroundBottom
            backgroundBottomOrange={true}
            backgroundBottomOpacity={0.6}
          />
          {expanded && this.fullPlayer()}
        </div>
        {expanded && this.fullPlayerButtons()}

        <div className={`mini-player ${active}`} id="player">
          <div id="pull" className="pull">
            <svg
              width="400"
              height="10"
              viewBox="0 0 400 10"
              style={{
                position: 'fixed',
                bottom: 98,
                paddingLeft: 16,
                paddingRight: 16,
                width: '100%',
                overflow: 'visible'
              }}
            >
              <path id="a" d={`M 0 10 c 200-0, 400,0, 400,0`} fill="#22022f" />
            </svg>
          </div>

          {!expanded && this.miniPlayer()}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ player }: ApplicationState): StateProps => {
  return { player };
};
export default connect(mapStateToProps, {
  setPlaylistPlayer,
  setRadioPlaylistPlayer,
  togglePlayer,
  toggleShuffle,
  toggleRepeat,
  playSong,
  favoriteSong,
  pauseSong,
  nextSong,
  prevSong,
  resumeSong,
  updateElapsed
})(PlayerComponent);
