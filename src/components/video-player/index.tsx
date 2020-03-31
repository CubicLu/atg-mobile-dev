import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { Nullable } from '../../types/common';
import { ButtonIcon } from '..';
import { PlayIcon, PauseIcon, FullscreenIcon, CloseIcon } from '../icon';

interface Props {}
interface State {
  readonly showControls: boolean;
  readonly paused: boolean;
  readonly first: boolean;
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
      first: true
    };
  }

  componentDidMount(): void {
    if (this.video?.canPlayType) {
      if (this.video) {
        this.video.controls = false;
      }
      this.showControl(true);
    }
  }

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
    if (this.video) {
      if (this.video.paused || this.video.ended) {
        this.video.play();
        this.setPaused(false, false);
      } else {
        this.video.pause();
        this.setPaused(true);
      }
    }
  }

  renderTopButtons(): React.ReactNode {
    return (
      <div className="row top-buttons">
        <div className="col s6">
          <ButtonIcon icon={<FullscreenIcon />} />
        </div>
        <div className="col s6 flex-justify-content-end">
          <ButtonIcon icon={<CloseIcon />} />
        </div>
      </div>
    );
  }
  renderButtonPlayOrPause(): React.ReactNode {
    if (!this.state.paused && this.state.first === true) {
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
        <div
          className="pause-button"
          onClick={(): void => this.togglePlay()}
        ></div>
      );
    }
  }
  renderControls(): React.ReactNode {
    if (!this.state.showControls) {
      return null;
    }
    return (
      <div className={`video-controls`} id="video-controls">
        {this.renderButtonPlayOrPause()}
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <div className="video-player-component">
        {this.renderTopButtons()}
        <div className="container">
          <video
            controls
            className="video"
            id="video"
            preload="metadata"
            poster="poster.jpg"
            ref={(ref): HTMLVideoElement | null => (this.video = ref)}
            playsInline
          >
            <source
              src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/videoplayback.mp4"
              type="video/mp4"
            ></source>
          </video>
          {this.renderControls()}
        </div>

       
      </div>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({ }: ApplicationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(VideoPlayerComponent);
