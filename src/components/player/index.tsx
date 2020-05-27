import React from 'react';
import {
  Header,
  ButtonSupport,
  BackgroundImage,
  ForwardIcon,
  ReplayIcon,
  PlayerProgress,
  PlayerVolume,
  MiniPlayerBar,
  DefaultModal
} from './../../components';
import {
  createGesture,
  GestureConfig,
  Gesture,
  createAnimation,
  IonSpinner
} from '@ionic/react';
import { connect } from 'react-redux';
import {
  togglePlayer,
  toggleShuffle,
  toggleRepeat,
  playSong,
  loadNextSong,
  favoriteSong,
  stopSong,
  pauseSong,
  resumeSong,
  seekSongPosition,
  updateSettingsModal
} from './../../actions';
import { ApplicationState } from '../../reducers';
import {
  SongInterface,
  PlaylistInterface,
  PlayerActionType,
  MediaType,
  ActionSheetInterface,
  ModalSlideInterface
} from '../../models';
import {
  PlayButton,
  NextButton,
  PrevButton,
  PauseButton,
  MixTapeButton,
  ShareButton,
  ShuffleButton,
  LikeButton,
  RepeatButton
} from '../icon/player';
import VigilAnimator from '../../utils/animateFrame';
import { store } from '../../store';
import BottomTilesComponent from '../bottom-tiles';
import ToastComponent from '../toast';
import {
  hideToastAction,
  showToastAction,
  updateSettingsProperty,
  updateActionSheet
} from '../../actions';
import { RouteComponentProps, withRouter } from 'react-router';

interface DispatchProps {
  togglePlayer: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  favoriteSong: () => void;
  playSong: (song: SongInterface, next?: SongInterface) => void;
  loadNextSong: (song: SongInterface) => void;
  stopSong: () => void;
  pauseSong: () => void;
  resumeSong: () => void;
  seekSongPosition: (time: number, increase: boolean) => void;
  showToastAction: () => void;
  hideToastAction: () => void;
  updateSettingsProperty: (property: string, value: string) => void;
  updateActionSheet: (property: ActionSheetInterface) => void;
}

declare global {
  interface Window {
    Media: MediaType | any;
  }
}
interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class PlayerComponent extends React.Component<Props> {
  pullPlayerGesture: Gesture | undefined;
  leftPlayerGesture: Gesture | undefined;
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
      case PlayerActionType.TOGGLE_CURRENT_NEXT_SONG:
        return this.actionToggleNextSong();
      case PlayerActionType.NEXT_SONG:
        return this.clickNextSong();
      case PlayerActionType.PREV_SONG:
        return this.clickPrevSong();
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
  get timeElapsed(): number {
    return store.getState().player.timeElapsed;
  }
  get duration(): number {
    return store.getState().player.duration;
  }
  clickPrevSong(): void {
    if (this.props.playing && this.timeElapsed > 2) {
      return this.props.seekSongPosition(0, false);
    }
    const list = this.props.playlist!.items;
    const current = this.currentIndex(list);
    const prev = list[Math.max(current - 1, 0)];
    this.props.playSong(prev, list[current]);
  }
  clickNextSong(): void {
    console.log('Clicked on clickNextSong');
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
  mainControls(): React.ReactNode {
    const { playing, song, starting } = this.props;
    return (
      <div className="main-controls fluid">
        <div className="player-progress full">
          <PlayerProgress displayInfo={true} seekDisabled={false} />
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
            onClick={(): void => this.props.seekSongPosition(-10, true)}
          >
            <ReplayIcon />
          </button>

          {starting && <IonSpinner className="white-spin" name="crescent" />}
          {playing && (
            <button
              disabled={!song}
              className="player-button"
              onClick={(): void => this.props.pauseSong()}
            >
              {<PauseButton />}
            </button>
          )}
          {!playing && (
            <button
              disabled={!song}
              className="player-button"
              onClick={(): void => this.resumeSong()}
            >
              {<PlayButton />}
            </button>
          )}

          <button
            disabled={!song}
            className="player-button"
            onClick={(): void => this.props.seekSongPosition(10, true)}
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

        <PlayerVolume />
      </div>
    );
  }
  getSelected(prop: boolean): string {
    return prop ? '#facf42' : '#fff';
  }

  toastClickHandler = (e): void => {
    e.preventDefault();
    this.props.updateSettingsProperty('activeFanTab', 'vault');
    this.navigateTo('/profile');
  };

  loadAlbumInfo(): void {
    store.dispatch(
      updateSettingsModal(
        <DefaultModal
          title="Album Info"
          content={this.renderAlbumContent()}
          onClick={(): void => {}}
          data={[]}
          overrideClick={true}
        />,
        undefined,
        70,
        (): void => {},
        undefined
      )
    );
  }
  renderAlbumContent(): React.ReactNode {
    const { playlist, song } = this.props;
    if (!song) return null;
    const to = (url): (() => void) => (): void => {
      store.dispatch(updateSettingsModal(null));
      this.navigateTo(url);
    };
    const albumUrl = song.artistUrl
      ? `/track/artist/${song.artistUrl}/${playlist!.id}`
      : undefined;
    const artistUrl = song.artistUrl ? `/artist/${song.artistUrl}` : undefined;
    return (
      <ul className="dual-list">
        <li onClick={to(albumUrl)} className="bold">
          Track Title
        </li>
        <li>{song?.title}</li>

        <li onClick={to(albumUrl)} className="bold">
          Album Title
        </li>
        <li onClick={to(albumUrl)}>{song?.album}</li>

        <li onClick={to(artistUrl)} className="bold">
          Artist
        </li>
        <li onClick={to(artistUrl)}>{song.artist}</li>

        <li className="bold">Featured Artists</li>
        <li className="answer">{'-'}</li>

        <li className="bold">Label</li>
        <li className="answer">{'-'}</li>

        <li className="bold">Publisher</li>
        <li className="answer">{song?.ISRC}</li>

        <li className="bold">Genre(s)</li>
        <li className="answer">{playlist?.owner}</li>

        <li className="bold">Era(s)</li>
        <li className="answer">{playlist?.owner}</li>

        <li className="bold">Language</li>
        <li className="answer">{'English'}</li>
      </ul>
    );
  }

  confirmShare(): void {
    store.dispatch(
      updateActionSheet({
        title: 'Share',
        confirmButtons: false,
        shareOption: true
      })
    );
  }

  playerNavbar(): React.ReactNode {
    return (
      <div id="player-navbar-buttons" className="player-navbar-buttons">
        <div
          onClick={(): void => this.props.toggleShuffle()}
          className="navbar-button flex-column mt-05"
        >
          <ShuffleButton color={this.getSelected(this.props.shuffle)} />
          <span className="f8 l1 my-05">Shuffle</span>
        </div>
        <div
          onClick={(): void => this.props.toggleRepeat()}
          className="navbar-button flex-column mt-05"
        >
          <RepeatButton color={this.getSelected(this.props.repeat)} />
          <span className="f8 l1 my-05">Repeat</span>
        </div>
        <div
          onClick={(): void => {
            this.props.favoriteSong();
            if (this.props.song?.favorite) {
              this.props.showToastAction();
            }
          }}
          className="navbar-button flex-column mt-05"
        >
          <LikeButton color={this.getSelected(!!this.props.song?.favorite)} />
          <span className="f8 l1 my-05">Like</span>
        </div>

        <div className="navbar-button flex-column mt-05">
          <MixTapeButton />
          <span className="f8 l1 my-05">Mixtape</span>
        </div>

        <div
          onClick={(): void => this.confirmShare()}
          className="navbar-button flex-column mt-05"
        >
          <ShareButton />
          <span className="f8 l1 my-05">Share</span>
        </div>

        {this.props.song && this.props.showToast && (
          <ToastComponent
            clickHandler={this.toastClickHandler}
            hideToast={this.props.hideToastAction}
            classNames={'custom-toast'}
          />
        )}
      </div>
    );
  }
  navigateTo(url?: string): void {
    if (!url) return;
    this.togglePlayer();
    return this.props.history.push(url);
  }
  navigateSource(): void {
    const { playlist, song, history } = this.props;
    switch (playlist?.source) {
      case 'artist':
        song?.artistUrl &&
          history.push(`/track/artist/${song.artistUrl}/${playlist!.id}`);
        return this.togglePlayer();
      case 'mixtape':
      case 'playlist':
        playlist && history.push(`/track/mixtape/${playlist?.id}/0`);
        return this.togglePlayer();
      case 'radio':
        song?.artistUrl === undefined
          ? history.push('/radio')
          : history.push(`/radio/${song?.artistUrl}`);
        return this.togglePlayer();
      default:
        return;
    }
  }

  mainCover(): React.ReactNode {
    const { song, playlist } = this.props;
    return (
      <React.Fragment>
        <div
          className="image radius"
          onClick={(): void => {
            song?.artistUrl &&
              this.navigateTo(
                `/track/artist/${song.artistUrl}/${playlist!.id}`
              );
          }}
          style={{
            backgroundImage: `url(${song?.cover || playlist?.cover})`,
            backgroundSize: 'cover'
          }}
        />
        <div className="cover-infos mt-2">
          <div
            className="f5 l2 mt-0"
            onClick={(): void => {
              song?.artistUrl &&
                this.navigateTo(
                  `/track/artist/${song.artistUrl}/${playlist!.id}`
                );
            }}
          >
            {song?.title}&nbsp;
          </div>
          <div className="f6 l1">{song?.artist}&nbsp;</div>
          <div className="text-10 l2">&nbsp;</div>
          <div onClick={(): void => this.navigateSource()} className="f6 l1">
            Source: {playlist?.name}&nbsp;
          </div>
        </div>
      </React.Fragment>
    );
  }
  fullPlayer(): React.ReactNode {
    const { song } = this.props;
    const visible =
      song?.artistUrl ||
      this.props.playlist?.source === 'artist' ||
      !!this.props.song?.artistUrl;
    const color1 = song?.backgroundGradient?.color1 || '';
    const color2 = song?.backgroundGradient?.color2 || '';
    return (
      <div id="full-player" className="full-player">
        <BackgroundImage
          gradient={`180deg,${color1},${color2}`}
          backgroundTop
          backgroundTopDark={true}
          backgroundTopOpacity={0.2}
          backgroundBottom
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.6}
          default={song?.backgroundGradient === undefined}
        />
        {this.props.expanded && (
          <React.Fragment>
            <Header
              leftBackButton={false}
              rightInfoButton={true}
              rightInfoOnClick={(): void => this.loadAlbumInfo()}
              centerInfoOnClick={(): void => this.togglePlayer()}
              centerContent={
                visible && (
                  <ButtonSupport artist={null} username={song?.artistUrl} />
                )
              }
              leftMinimizeButton={true}
              leftMinimizeOnClick={(): void => this.togglePlayer()}
            />
            <div id="expanded-body" className="space-between h-100">
              <div className="m-4 mb-2 player-upper-half space-between">
                {this.mainCover()}
              </div>

              <div className="flex compass south center m-4 mt-2 mb-2">
                {this.mainControls()}
              </div>

              <BottomTilesComponent
                onClick={(): void => this.togglePlayer()}
                tiles={[]}
                artistUrl={this.props.song?.artistUrl}
                hidden={!visible}
              />
            </div>

            {this.playerNavbar()}
          </React.Fragment>
        )}
      </div>
    );
  }
  render(): React.ReactNode {
    if (!this.expansePlayerAnimation) this.createPlayerAnimation();
    return (
      <React.Fragment>
        {this.fullPlayer()}
        <MiniPlayerBar
          history={this.props.history}
          togglePlayer={(): void => this.togglePlayer()}
          favoriteSong={(): void => this.props.favoriteSong()}
          clickNextSong={(): void => this.clickNextSong()}
          pauseSong={(): void => this.props.pauseSong()}
          resumeSong={(): void => this.resumeSong()}
        />
      </React.Fragment>
    );
  }

  //gesture and pull player
  createPlayerGesture(): void {
    const mini = document.querySelector('#player');
    if (!mini) return;
    const gesturePull: GestureConfig = {
      el: mini,
      direction: 'y',
      gestureName: 'playerPull',
      gesturePriority: 21,
      passive: true,
      onEnd: this.playerSwipeUp,
      onMove: this.playerPull
    };
    const gestureLeft: GestureConfig = {
      el: mini,
      direction: 'x',
      gestureName: 'playerClose',
      gesturePriority: 20,
      passive: true,
      onEnd: this.playerSwipeLeftEnd,
      onMove: this.playerSwipeLeft
    };
    this.pullPlayerGesture = createGesture(gesturePull);
    this.leftPlayerGesture = createGesture(gestureLeft);
    this.pullPlayerGesture.enable();
    this.leftPlayerGesture.enable();
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
  togglePlayer(): void {
    this.togglePlayerBar();
  }
  async togglePlayerBar(): Promise<void> {
    if (this.expansionInProgress) return;
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

  playerSwipeLeft = (gesture: any): void => {
    if (gesture.deltaX >= 0) return;
    const mini = document.querySelector('#inner-player') as HTMLElement;
    mini.style.transform = `translateX(${gesture.deltaX}px)`;
    if (gesture.deltaX < -125) {
      mini.style.transform = `translateX(${-125}px)`;
      this.props.stopSong();
    }
  };
  playerSwipeLeftEnd = (): void => {
    const mini = document.querySelector('#inner-player') as HTMLElement;
    mini.style.transform = `translateX(${0}px)`;
  };
  playerSwipeUp = (gesture: any): void => {
    const validSwipeUp = !this.props.expanded && gesture.deltaY < -250;
    this.pullingInProgress = false;

    if (!this.props.expanded && !validSwipeUp) {
      this.elasticBack();
      return;
    }
    validSwipeUp && this.togglePlayer();

    const validSwipeDown = this.props.expanded && gesture.deltaY > 100;
    validSwipeDown && this.togglePlayer();
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
}
interface StateProps {
  expanded: boolean;
  playing: boolean;
  paused: boolean;
  starting: boolean;
  shuffle: boolean;
  repeat: boolean;
  playerAction?: string;

  song?: SongInterface;
  next?: SongInterface;
  playlist?: PlaylistInterface;
  showToast: boolean;
  modal: ModalSlideInterface;
}
const mapStateToProps = ({
  player,
  settings
}: ApplicationState): StateProps => {
  const {
    expanded,
    playing,
    starting,
    paused,
    song,
    next,
    playlist,
    shuffle,
    repeat,
    playerAction
  } = player;

  const { showToast, modal } = settings;

  return {
    expanded,
    playing,
    starting,
    paused,
    song,
    next,
    playlist,
    shuffle,
    repeat,
    playerAction,
    showToast,
    modal
  };
};
export default withRouter(
  connect(mapStateToProps, {
    togglePlayer,
    toggleShuffle,
    toggleRepeat,
    playSong,
    loadNextSong,
    favoriteSong,
    stopSong,
    pauseSong,
    resumeSong,
    seekSongPosition,
    hideToastAction,
    showToastAction,
    updateSettingsProperty,
    updateActionSheet
  })(PlayerComponent)
);
