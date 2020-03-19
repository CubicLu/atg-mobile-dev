import React from 'react';
import moment from 'moment';
import {
  PauseIcon,
  StarIcon,
  NextIcon,
  Header,
  BackgroundImage
} from './../../components';
import {} from './../../actions';
import {
  createGesture,
  GestureConfig,
  Gesture,
  createAnimation,
  IonButton,
  IonImg
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
  PauseButton
} from '../icon/player';
import { PlayIcon } from '../icon';

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
  intervalId: number | undefined;
  animating: boolean = false;
  gestureMini: Gesture | undefined;
  gestureExpanded: Gesture | undefined;
  animation: any;
  private ref: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount(): void {
    this.enablePlayerGesture();
    this.enablePlayerAnimation();
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.player.song == null && nextProps.player.playlist != null) {
      this.playNewAudio(nextProps.player.playlist.items[0]);
    }
  }

  enablePlayerGesture(): void {
    const mini = this.ref.current!;
    if (!mini) return;
    const gestureConfigMini: GestureConfig = {
      el: mini,
      direction: 'y',
      gestureName: 'playerMove',
      gesturePriority: 20,
      passive: true,
      onEnd: this.playerSwipe.bind(this)
    };
    this.gestureMini = createGesture(gestureConfigMini);
    this.gestureMini.enable();
  }

  playerSwipe(gesture: any): void {
    const validSwipeUp = !this.props.player.expanded && gesture.deltaY < 50;
    const validSwipeDown = this.props.player.expanded && gesture.deltaY > 100;
    if (validSwipeDown || validSwipeUp) this.togglePlayer(null);
  }

  enablePlayerAnimation(): void {
    const player = this.ref.current!;
    if (!player) return;
    this.animation = createAnimation()
      .addElement(player)
      .duration(250)
      .fromTo('minHeight', '0%', 'calc(100% - 60px)')
      .fromTo(
        'background',
        'linear-gradient(180deg, #22022f, #070707)',
        'linear-gradient(180deg, #aed8e5, #039e4a)'
      );
  }
  togglePlayer(e: any): void {
    e?.preventDefault();
    const direction = this.props.player.expanded ? 'reverse' : 'normal';
    if (this.animating) return;
    this.animating = true;
    this.props.togglePlayer();
    this.animation.direction(direction);
    this.animation.play();
    this.animating = false;
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

  render(): React.ReactNode {
    const {
      expanded,
      playing,
      timeElapsed,
      playlist,
      song
    } = this.props.player;
    const disabled = !song;

    return (
      <div ref={this.ref} className="player">
        {expanded && (
          <React.Fragment>
            <BackgroundImage
              gradient={`180deg,#aed8e500,#039e4a00`}
              backgroundTop
              backgroundBottom
              backgroundBottomDark={false}
              bottomRotate
              backgroundTopDark
              backgroundTopOpacity={0.25}
              backgroundBottomOpacity={0.3}
            />
            <Header
              leftBackButton={false}
              centerContent={
                <IonButton
                  className="support rounded"
                  routerDirection="forward"
                  routerLink={``}
                >
                  SUPPORT US
                </IonButton>
              }
              leftMinimizeButton={true}
              leftMinimizeOnClick={this.togglePlayer.bind(this)}
            />
            <div className="expanded">
              <div className="cover-title">
                <IonImg className="image" src={song?.cover} />
                <span className="main-song">{song?.name}&nbsp;</span>
                <br />
                <span className="main-artist">{song?.artist}&nbsp;</span>
                <br />
                <span className="main-source">
                  Source: {playlist?.name}&nbsp;
                </span>
              </div>

              <div className="main-player">
                <div className="player-progress">
                  <div
                    className="bar"
                    style={{ width: timeElapsed * 3.333 }}
                  ></div>
                  <div className="elapsed">
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
              </div>

              <div className="see-more">
                <span className="tile-label">Liner Notes</span>
                <span className="tile-label">Community</span>
                <span className="tile-label">Artist Home</span>
              </div>
              <div className="see-more">
                <IonImg
                  onClick={this.props.setPlaylistPlayer.bind(this)}
                  className="tile"
                  src={
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/happy.png'
                  }
                />
                <IonImg
                  onClick={this.props.setRadioPlaylistPlayer.bind(this)}
                  className="tile"
                  src={
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/gallery/untitled-folder-1/cover.png'
                  }
                />
                <IonImg
                  onClick={this.props.setPlaylistPlayer.bind(this)}
                  className="tile"
                  src={
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/number_one.png'
                  }
                />
              </div>
            </div>
          </React.Fragment>
        )}

        {!expanded && (
          <React.Fragment>
            {!disabled && (
              <div className="progress">
                <div
                  className="bar"
                  style={{ width: timeElapsed * 3.333 }}
                ></div>
              </div>
            )}
            <div className="cover">
              <div
                className="img"
                style={{
                  backgroundSize: 'contain',
                  background: disabled ? '#1a0922cc' : `url(${song?.cover})`
                }}
              >
                {!disabled && (
                  <div className="icon">
                    {playing ? (
                      <button
                        disabled={!song}
                        className="player-button"
                        onClick={(): void => this.pauseSong()}
                      >
                        <PauseIcon />
                      </button>
                    ) : (
                      <button
                        disabled={!song}
                        className="player-button"
                        onClick={(): void => this.resumeSong()}
                      >
                        <PlayIcon />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div
                className="col s3"
                onClick={this.togglePlayer.bind(this)}
                style={{ height: '50px' }}
              />
              <div className="col s9">
                <div className="row">
                  <div
                    onClick={this.togglePlayer.bind(this)}
                    className="col s7 info"
                  >
                    <span className="song">{song?.name}</span>
                    <span className="artist">{song?.artist}</span>
                  </div>
                  <div className="col s5 commands">
                    <ul className="list inline">
                      <li>
                        <button
                          disabled={disabled}
                          onClick={this.props.favoriteSong.bind(this)}
                        >
                          <StarIcon />
                        </button>
                      </li>
                      <li>
                        <button
                          disabled={disabled}
                          onClick={this.nextSong.bind(this)}
                        >
                          <NextIcon />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
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
