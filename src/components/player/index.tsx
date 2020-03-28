import React from 'react';
import moment from 'moment';
import {
  PauseIcon,
  StarIcon,
  NextIcon,
  Header,
  BackgroundImage,
  ButtonSupport
} from './../../components';

import {
  createGesture,
  GestureConfig,
  Gesture,
  createAnimation,
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
import { PlayerReducerType, SongInterface, ShapesSize } from '../../interfaces';
import {
  PlayButton,
  NextButton,
  PrevButton,
  PauseButton
} from '../icon/player';
import { PlayIcon } from '../icon';
import VigilAnimator from '../../utils/animateFrame';
import { RouteComponentProps, withRouter } from 'react-router';
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
interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class PlayerComponent extends React.Component<Props> {
  audio: HTMLAudioElement | undefined;
  intervalId: number | undefined;
  animating: boolean = false;
  gestureMini: Gesture | undefined;
  gestureExpanded: Gesture | undefined;
  relativeAnimation: Animation | any;
  lastY?: number;
  pulling: boolean = false;

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
    const mini = document.querySelector('#player');
    if (!mini) return;
    const gestureConfigMini: GestureConfig = {
      el: mini,
      direction: 'y',
      gestureName: 'playerMove',
      gesturePriority: 20,
      passive: true,
      onEnd: this.playerSwipe.bind(this),
      onMove: this.playerPull.bind(this)
    };
    this.gestureMini = createGesture(gestureConfigMini);
    this.gestureMini.enable();
  }

  playerSwipe(gesture: any): void {
    const validSwipeUp = !this.props.player.expanded && gesture.deltaY < -250;
    this.pulling = false;
    if (!this.props.player.expanded && !validSwipeUp) {
      this.elasticBack();
      return;
    }

    const validSwipeDown = this.props.player.expanded && gesture.deltaY > 100;
    if (validSwipeDown || validSwipeUp) this.togglePlayer(null);
  }

  elasticBack(): void {
    new VigilAnimator({
      element: document.getElementById('a')!,
      axisY: Math.abs(this.lastY!),
      axisX: 0,
      duration: 500,
      direction: 'normal'
    }).elasticPlay();
  }

  enablePlayerAnimation(): void {
    const player = document.querySelector('#player');
    if (!player) return;
    this.relativeAnimation = createAnimation()
      .addElement(player)
      .duration(300)
      .fromTo('minHeight', '0%', 'calc(100% - 58px)')
      .onFinish((): void => {
        this.animating = false;
        this.forceUpdate();
      });
  }
  togglePlayer(e: any): void {
    e?.preventDefault();
    const direction = this.props.player.expanded ? 'reverse' : 'normal';
    if (this.animating) return;
    this.props.togglePlayer();
    this.relativeAnimation.direction(direction);
    this.animating = true;
    this.relativeAnimation
      .beforeAddClass('moving')
      .afterRemoveClass('moving')
      .play();
    this.forceUpdate();
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

  playerPull(gesture: any): void {
    const svg = document.getElementById('a');
    if (!svg) return;
    if (!this.pulling && window.innerHeight - gesture.startY > 110) return;
    this.pulling = true;
    if (gesture.deltaY > -250 && gesture.deltaY < 0) {
      this.lastY = gesture.deltaY;
      svg.setAttribute(
        'd',
        `M 0 10 c 200-${Math.abs(gesture.deltaY)}, 400,0, 400,0`
      );
    }
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

    if (!this.relativeAnimation) this.enablePlayerAnimation();
    return (
      <div id="player" className="player">
        <div className="mini">
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

              <div id="pull" className="pull">
                <svg
                  width="400"
                  height="10"
                  viewBox="0 0 400 10"
                  style={{
                    position: 'fixed',
                    bottom: 99,
                    paddingLeft: 15,
                    paddingRight: 15,
                    width: '100%',
                    overflow: 'visible'
                  }}
                >
                  {/* //1 a 213 */}
                  <path
                    id="a"
                    d={`M 0 10 c 200-0, 400,0, 400,0`}
                    fill="#22022f"
                  />
                </svg>
                {/*
                  <path id="g" d="M 0 84.4 c 200-178,     400,0 400,0"/>
                  <path id="h" d="M 0 64.9 c 200-133,     400,0 400,0"/>
                  <path id="i" d="M 0 48.1 c 200-95,    400,0 400,0"/>
                  <path id="j" d="M 0 26.6 c 200-48,    400,0 400,0"/> */}
                {/* M0 0	193.8908781	0 a	6.109121876	250 0 1	1 0	500 L0
              M0 0	195.8423705	0 a	4.157629532	250 0 1	1 0	500 L0
              M0 0	197.7156247	0 a	2.284375307	250 0 1	1 0	500 L0
              M0 0	199.5122695	0 a	0.4877305289	250 0 1	1 0	500 L0
              quando chega no zero
              M0 0	201.2339146	0 a	1.233914589	250 0 1	0 0	500 L0
              M0 0	202.882151	0 a	2.882151042	250 0 1	0 0	500 L0
              M0 0	204.4585511	0 a	4.458551133	250 0 1	0 0	500 L0
              M0 0	205.9646686	0 a	5.964668572	250 0 1	0 0	500 L0
              M0 0	207.4020386	0 a	7.402038574	250 0 1	0 0	500 L0 */}

                {/* <path id="end" d="M.059,5C187.331,2.617,376.085,5,376.085,5"/>
              <path id="inverse" d="M.059,13.75c0-5.088.015-5.15.015-11.3C64.191,7.015,281.03,3.906,376.2,1.941c0,7.66-.056.03-.056,11.809"/>
              <path id="invers2" d="M.059,18.955c0-7.331.015-16.283.015-16.283S32.209,4.879,55.5,5.413c85.745,3.758,247.541-.038,320.7-3.473,0,11.035-.056.043-.056,17.014"/> */}
              </div>

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
        <div
          className="player-expanded h-100"
          style={expanded ? {} : { height: 0 }}
        >
          {expanded && (
            <React.Fragment>
              <BackgroundImage
                gradient={`180deg,#aed8e5,#039e4a`}
                backgroundTop
                backgroundTopDark={true}
                backgroundTopOpacity={0.2}
                backgroundBottom
                backgroundBottomOrange={true}
                backgroundBottomOpacity={0.6}
              />
              <Header
                leftBackButton={false}
                centerContent={
                  <ButtonSupport
                    buttonType={'text'}
                    uppercase
                    type={ShapesSize.rounded}
                  />
                }
                leftMinimizeButton={true}
                leftMinimizeOnClick={this.togglePlayer.bind(this)}
              />
              <div id="expanded-body" className="space-between h-100 p-0">
                <div className="player-upper-half m-4">
                  <div
                    className="image"
                    style={{
                      background: `url(${song?.cover})`,
                      backgroundSize: 'cover'
                    }}
                  />
                  <span className="f4">{song?.name}&nbsp;</span>
                  <br />
                  <span className="f6">{song?.artist}&nbsp;</span>
                  <br />
                  <span className="main-source">
                    Source: {playlist?.name}&nbsp;
                  </span>
                </div>

                <div className="main-player m-4 h-33">
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

                <div className="bottom-shadow h-16 w-100" />
                <div className="artist-bar flex-compass south half h-16">
                  <div className="flex-align-baseline fluid">
                    <div
                      className="tile"
                      onClick={this.props.setPlaylistPlayer.bind(this)}
                      style={shadowTitle(
                        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/happy.png'
                      )}
                    >
                      <span className="tile-label f6">Liner Notes</span>
                    </div>
                    <div
                      className="tile"
                      onClick={this.props.setRadioPlaylistPlayer.bind(this)}
                      style={shadowTitle(
                        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/gallery/untitled-folder-1/cover.png'
                      )}
                    >
                      <span className="tile-label f6">Liner Notes</span>
                    </div>
                    <div
                      className="tile"
                      onClick={(): void => {
                        this.props.history.push('/home/track/default/2/1');
                        this.togglePlayer(null);
                      }}
                      style={shadowTitle(
                        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/number_one.png'
                      )}
                    >
                      <span className="tile-label f6">Liner Notes</span>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }: ApplicationState): StateProps => {
  return { player };
};
export default withRouter(
  connect(mapStateToProps, {
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
  })(PlayerComponent)
);
