import React from 'react';
import { connect } from 'react-redux';
import { Nullable, ShapesSize } from './../../types';
import { ButtonIcon, PlayIcon, PauseIcon, FullscreenIcon, CloseIcon } from '..';
import { SongInterface } from '../../models';
import { IonRange, isPlatform } from '@ionic/react';
import { pauseSong, playSong } from '../../actions';
import { ApplicationState } from '../../reducers';

interface StateProps {
  song?: SongInterface;
}

interface DispatchProps {
  pauseSong: () => void;
  playSong: (song: SongInterface) => any;
}

interface Props extends DispatchProps, StateProps {
  readonly onClickClose: Function;
  readonly changeVideoOrientation: (value: string) => void;
  videoUrl: string;
  isPortrait: boolean;
}
interface State {
  readonly showControls: boolean;
  readonly paused: boolean;
  readonly first: boolean;
  readonly currentTime: string;
  readonly totalTime: string;
  readonly videoDuration: number;
  readonly currentTimeNumber: number;
}

interface TimeInterface {
  readonly minutes: string;
  readonly seconds: string;
}

class VideoPlayerComponent extends React.Component<Props, State> {
  private video: Nullable<HTMLVideoElement>;
  private videoControls: React.ReactNode;

  constructor(props: Props) {
    super(props);

    this.video = null;
    this.videoControls = null;

    this.state = {
      showControls: false,
      paused: false,
      first: true,
      currentTime: '00:00',
      totalTime: '00:00',
      videoDuration: 0,
      currentTimeNumber: 0
    };
  }

  componentDidMount(): void {
    if (this.video?.canPlayType) {
      if (this.video) {
        this.video.controls = false;
        this.video.addEventListener(
          'timeupdate',
          this.updateCurrentTime.bind(this)
        );
      }
      this.showControl(true);
    }
  }

  detectOrientation = (video: Nullable<HTMLVideoElement>): void => {
    const { changeVideoOrientation } = this.props;
    if (
      video?.videoWidth &&
      video?.videoWidth > video?.videoHeight &&
      video?.videoHeight
    ) {
      changeVideoOrientation('landscape');
    } else if (
      video?.videoWidth &&
      video?.videoWidth < video?.videoHeight &&
      video?.videoHeight
    ) {
      changeVideoOrientation('portrait');
    } else {
      changeVideoOrientation('even');
    }
  };

  showControl(condition = false): void {
    this.setState({
      showControls: condition
    });
  }

  setPaused(condition = false, first = false): void {
    this.setState({
      paused: condition,
      first: first
    });
  }

  togglePlay(): void {
    const { pauseSong, playSong, song } = this.props;
    if (this.video) {
      if (this.video.paused || this.video.ended) {
        pauseSong();
        this.video.play();
        this.setPaused(false, false);
      } else {
        this.video.pause();
        this.setPaused(true);
        if (song) {
          playSong(song);
        }
      }
    }
  }
  formatTime(timeInSeconds): TimeInterface {
    if (!isNaN(timeInSeconds)) {
      const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

      return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2)
      };
    }
    return {
      minutes: '00',
      seconds: '00'
    };
  }

  toggleFullscreen = (): void => {
    const video = this.video;
    const isIOS = isPlatform('ios');
    if (video) {
      if (isIOS) {
        //@ts-ignore
        video.webkitSetPresentationMode &&
          //@ts-ignore
          video.webkitSetPresentationMode('fullscreen');
        return;
      }
      if (!document.fullscreenElement) {
        video.requestFullscreen();
      }

      document.onfullscreenchange = (): void => {
        if (!document.fullscreenElement) {
          window.deviceready && window.screen.orientation?.lock('portrait');
          document.fullscreen &&
            document.exitFullscreen &&
            document.exitFullscreen();
        } else {
          window.deviceready && window.screen?.orientation?.unlock();
        }
      };
    }
  };

  setCurrentTimeVideo(event: number): void {
    let currentTimeNumber = this.state.currentTimeNumber;
    let value = this.state.currentTime;
    if (this.video) {
      this.video.currentTime = event;
      const time = this.formatTime(Math.round(event));

      currentTimeNumber = Math.round(event);
      value = `${time.minutes}:${time.seconds}`;
    }
    if (currentTimeNumber === this.state.currentTimeNumber) return;
    this.setState({
      currentTime: value,
      currentTimeNumber: currentTimeNumber
    });
  }

  updateCurrentTime(): void {
    let value = this.state.currentTime;
    let currentTimeNumber = this.state.currentTimeNumber;
    if (this.video) {
      const time = this.formatTime(Math.round(this.video.currentTime));
      currentTimeNumber = Math.round(this.video.currentTime);
      value = `${time.minutes}:${time.seconds}`;
    }
    if (currentTimeNumber === this.state.currentTimeNumber) return;
    this.setState({
      currentTime: value,
      currentTimeNumber: currentTimeNumber
    });
  }

  updateTotalTime(): void {
    let value = this.state.totalTime;
    let videoDuration = 0;
    let currentTimeNumber = 0;
    if (this.video) {
      videoDuration = Math.round(this.video.duration);
      const time = this.formatTime(videoDuration);
      value = `${time.minutes}:${time.seconds}`;
    }
    this.setState({
      totalTime: value,
      videoDuration: videoDuration,
      currentTimeNumber: currentTimeNumber
    });
  }

  renderTopButtons(): React.ReactNode {
    const { isPortrait } = this.props;
    return (
      <div
        className={`flex-wrap mx-2 pt-05 ${
          isPortrait ? 'vertical-video-controls' : ''
        }`}
      >
        <div className={`${!isPortrait ? 'align-start' : ''}`}>
          <ButtonIcon
            type={ShapesSize.small}
            icon={<FullscreenIcon />}
            onClick={this.toggleFullscreen}
          />
        </div>
        <div className="align-end flex-justify-content-end">
          <ButtonIcon
            type={ShapesSize.small}
            icon={<CloseIcon />}
            onClick={(): void => {
              this.props.onClickClose();
            }}
          />
        </div>
      </div>
    );
  }
  renderButtonPlayOrPause(): React.ReactNode {
    if (!this.state.paused && this.state.first) {
      return (
        <div className="play-button">
          <ButtonIcon
            styles={{ width: 64, height: 64 }}
            icon={<PlayIcon />}
            onClick={(): void => this.togglePlay()}
          />
        </div>
      );
    } else if (this.state.paused) {
      return (
        <div className="pause-button">
          <ButtonIcon
            styles={{ width: 64, height: 64 }}
            icon={<PauseIcon color={'#fff'} opacity={1} />}
            onClick={(): void => this.togglePlay()}
          />
        </div>
      );
    } else {
      return (
        <div className="pause-button" onClick={(): void => this.togglePlay()} />
      );
    }
  }

  renderBottom(): React.ReactNode {
    return (
      <div className="progress-bar flex-wrap fluid p-0 f8 l1 pb-1">
        <time className="mx-2" id="time-elapsed">
          {this.state.currentTime}
        </time>
        <IonRange
          className="m-0 p-0 video-range"
          min={0}
          max={this.state.videoDuration}
          onIonChange={(event): void =>
            this.setCurrentTimeVideo(Number(event.detail.value))
          }
        />
        <time className="mx-2" id="duration">
          {this.state.totalTime}
        </time>
      </div>
    );
  }

  renderControls(): React.ReactNode {
    if (!this.state.showControls) {
      return null;
    }
    return (
      <div className={'video-controls'} id="video-controls">
        {this.renderButtonPlayOrPause()}
      </div>
    );
  }

  handleLoadMetadata = (): void => {
    this.updateTotalTime();
    this.detectOrientation(this.video);
  };

  render(): React.ReactNode {
    const { isPortrait } = this.props;
    return (
      <div
        className={`${
          !isPortrait ? 'video-player-component' : 'vertical-video-player'
        }`}
      >
        {this.renderTopButtons()}
        <div className="container">
          <video
            controls
            className="video"
            id="video"
            preload="metadata"
            ref={(ref): HTMLVideoElement | null => (this.video = ref)}
            playsInline
            onClick={(): void => (isPortrait ? this.togglePlay() : undefined)}
            onLoadedMetadata={this.handleLoadMetadata}
          >
            <source src={`${this.props.videoUrl}#t=0.5`} type="video/mp4" />
          </video>
          {this.renderControls()}
        </div>
        {this.renderBottom()}
      </div>
    );
  }
}

const mapStateToProps = ({ player }: ApplicationState): StateProps => {
  const { song } = player;
  return { song };
};

export default connect(mapStateToProps, { pauseSong, playSong })(
  VideoPlayerComponent
);
