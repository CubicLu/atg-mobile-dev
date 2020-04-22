import React from 'react';
import moment from 'moment';
import {
  PauseIcon,
  StarIcon,
  NextIcon,
  Header,
  ButtonSupport,
  BackgroundImage,
  PlayIcon,
  ForwardIcon,
  ReplayIcon
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
  loadNextSong,
  favoriteSong,
  pauseSong,
  resumeSong,
  updateElapsed,
  updateVolume,
  seekSongPosition,
  setPlayerAction
} from './../../actions/playerActions';
import { ApplicationState } from '../../reducers';
import { SongInterface, PlaylistInterface, ActionType } from '../../interfaces';
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
import VigilAnimator from '../../utils/animateFrame';
import { shadowTitle } from '../../utils';

interface StateProps {
  expanded: boolean;
  playing: boolean;
  paused: boolean;
  canSkip: boolean;
  shuffle: boolean;
  repeat: boolean;
  timeElapsed: number;
  masterVolume: number;
  playerAction?: string;

  song?: SongInterface;
  next?: SongInterface;
  playlist?: PlaylistInterface;
}
interface DispatchProps {
  setPlaylistPlayer: () => void;
  setRadioPlaylistPlayer: () => void;
  togglePlayer: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  playSong: (song: SongInterface, next?: SongInterface) => void;
  loadNextSong: (song: SongInterface) => void;
  favoriteSong: () => void;
  pauseSong: () => void;
  resumeSong: () => void;
  updateElapsed: (time: number) => void;
  updateVolume: (time: number) => void;
  seekSongPosition: (time: number) => void;
  setPlayerAction: (action: string) => void;
}

interface Props extends StateProps, DispatchProps {}
class PlayerComponent extends React.Component<Props> {
  pullPlayerGesture: Gesture | undefined;
  pullingInProgress: boolean = false;
  expansePlayerAnimation: Animation | any;
  expansionInProgress: boolean = false;
  lastY?: number;
  componentDidMount(): void {
    this.createPlayerGesture();
    this.createPlayerAnimation();
  }
  componentDidUpdate(): void {
    switch (this.props.playerAction) {
      case ActionType.SET_PLAYLIST:
        if (!this.props.song) return;
        this.props.next
          ? this.props.playSong(this.props.song!, this.props.next!)
          : this.props.playSong(this.props.song!);
        break;
      //song current is state.next and next is undefined,
      case ActionType.TOGGLE_CURRENT_NEXT_SONG:
        return this.actionToggleNextSong();
      case ActionType.NEXT_SONG:
        return this.clickPrevSong();
      case ActionType.PREV_SONG:
        return this.clickNextSong();
    }
  }
  actionToggleNextSong(): void {
    let list = this.props.playlist?.items;
    if (!list) return console.log('no list');

    const current = this.currentIndex(list);
    const next = current < list.length - 1 ? current + 1 : 0;
    return this.props.loadNextSong(list[next]);
  }

  currentIndex(list: SongInterface[]): number {
    return list.findIndex((x): any => x.id === this.props.song?.id);
  }

  clickPrevSong(): void {
    if (!this.props.paused && this.props.timeElapsed > 2) {
      return this.props.seekSongPosition(0);
    }
    const list = this.props.playlist!.items;
    const current = this.currentIndex(list);
    const prev = list[Math.max(current - 1, 0)];
    const curr = list[current];
    this.props.playSong(prev, curr);
  }
  clickNextSong(): void {
    let list = this.props.playlist!.items;
    if (!list) return;
    const listsize = list.length - 1;
    const current = this.currentIndex(list);
    const next = current < listsize ? current + 1 : 0;
    const second = next < listsize ? next + 1 : 0;
    this.props.playSong(list[next], list[second]);
  }
  resumeSong(): void {
    return this.props.song ? this.props.resumeSong() : this.clickNextSong();
  }

  pullMiniPlayer(): React.ReactNode {
    return (
      <div id="pull" className="pull">
        <svg
          width="400"
          height="10"
          viewBox="0 0 400 10"
          className="elastic-pull"
          style={{
            position: 'fixed',
            bottom: 99,
            paddingLeft: 16,
            paddingRight: 16,
            overflow: 'visible',
            width: '100%'
          }}
        >
          <path id="a" d={'M 0 10 c 200-0, 400,0, 400,0'} fill="#22022f" />
        </svg>
      </div>
    );
  }
  miniPlayerBottomBar(): React.ReactNode {
    const { playing, expanded, song } = this.props;
    const disabled = !song;
    if (expanded) return <div />;
    return (
      <>
        {song && (
          <div className="progress">
            <IonRange
              className="bar"
              value={this.props.timeElapsed}
              min={0}
              max={30}
              // onIonChange={(e: any): void => console.log(e.detail.value)}
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
                    className="mini-player-toggle p-0"
                    onClick={(): void => this.props.pauseSong()}
                  >
                    <PauseIcon width={15} color={'#fff'} opacity={0.75} />
                  </button>
                ) : (
                  <button
                    disabled={!song}
                    className="mini-player-toggle p-0"
                    onClick={(): void => this.resumeSong()}
                  >
                    <PlayIcon opacity={0.75} />
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
                  onClick={(): void => this.clickNextSong()}
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
  seekSong(newPosition: number): void {
    if (Math.abs(newPosition - this.props.timeElapsed) <= 1) return;
    this.props.seekSongPosition(newPosition);
  }

  mainControls(): React.ReactNode {
    const { playing, song } = this.props;
    return (
      <div className="main-controls fluid">
        <div className="player-progress">
          <IonRange
            className="bar"
            value={this.props.timeElapsed}
            min={0}
            max={30}
            onIonChange={(e: CustomEvent): void =>
              this.seekSong(e.detail.value)
            }
          />

          <div className="elapsed f6">
            <span>
              {moment()
                .minutes(0)
                .second(this.props.timeElapsed)
                .format('m:ss')}
            </span>
            <span>
              {moment()
                .minutes(0)
                .second(30)
                .format('m:ss')}
            </span>
          </div>
        </div>

        <div className="player-three-buttons">
          <button
            disabled={!song}
            className="player-button"
            onClick={(): void => this.clickPrevSong()}
          >
            <PrevButton />
          </button>
          <button
            disabled={!song}
            className="player-button"
            onClick={(): void => this.seekSong(this.props.timeElapsed - 10)}
          >
            <ReplayIcon />
          </button>

          {playing && (
            <button
              disabled={!song}
              className="player-button"
              onClick={(): void => this.props.pauseSong()}
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
            onClick={(): void => this.seekSong(this.props.timeElapsed + 10)}
          >
            <ForwardIcon />
          </button>

          <button
            disabled={!song}
            className="player-button"
            onClick={(): void => this.clickNextSong()}
          >
            <NextButton />
          </button>
        </div>

        <div className="player-volume mt-4 flex-align-items-center">
          <VolumeMuteButton />
          <IonRange
            min={0}
            max={1}
            step={0.05}
            value={this.props.masterVolume}
            onIonChange={(e: any): void =>
              this.props.updateVolume(e.detail.value)
            }
          />
          <VolumeButton />
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
    const { song, playlist } = this.props;
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
  render(): React.ReactNode {
    const active = this.props.song ? 'active' : '';
    if (!this.expansePlayerAnimation) this.createPlayerAnimation();

    return (
      <React.Fragment>
        <div id="full-player" className="full-player">
          <BackgroundImage
            gradient={'180deg,#aed8e5,#039e4a'}
            backgroundTop
            backgroundTopDark={true}
            backgroundTopOpacity={0.2}
            backgroundBottom
            backgroundBottomOrange={true}
            backgroundBottomOpacity={0.6}
          />
          {this.props.expanded && this.fullPlayer()}
          {this.props.expanded && this.fullPlayerButtons()}
        </div>

        <div id="player" className={`mini-player ${active}`}>
          {this.pullMiniPlayer()}
          {this.miniPlayerBottomBar()}
        </div>
      </React.Fragment>
    );
  }
  async togglePlayer(e: any): Promise<void> {
    if (this.expansionInProgress) return;
    e?.preventDefault();
    const direction = this.props.expanded ? 'reverse' : 'normal';
    this.expansionInProgress = true;
    this.elasticBack();
    if (direction === 'normal') this.props.togglePlayer();
    await this.expansePlayerAnimation.direction(direction).play();
    this.expansionInProgress = false;
    if (direction === 'reverse') this.props.togglePlayer();
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
    const validSwipeUp = !this.props.expanded && gesture.deltaY < -250;
    this.pullingInProgress = false;
    if (!this.props.expanded && !validSwipeUp) {
      this.elasticBack();
      return;
    }

    const validSwipeDown = this.props.expanded && gesture.deltaY > 100;
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
}
const mapStateToProps = ({ player }: ApplicationState): StateProps => {
  const {
    expanded,
    playing,
    paused,
    song,
    next,
    playlist,
    timeElapsed,
    masterVolume,
    canSkip,
    shuffle,
    repeat,
    playerAction
  } = player;

  return {
    expanded,
    playing,
    paused,
    song,
    next,
    playlist,
    timeElapsed,
    masterVolume,
    canSkip,
    shuffle,
    repeat,
    playerAction
  };
};
export default connect(mapStateToProps, {
  setPlaylistPlayer,
  setRadioPlaylistPlayer,
  togglePlayer,
  toggleShuffle,
  toggleRepeat,
  playSong,
  loadNextSong,
  favoriteSong,
  pauseSong,
  resumeSong,
  updateElapsed,
  updateVolume,
  seekSongPosition,
  setPlayerAction
})(PlayerComponent);
