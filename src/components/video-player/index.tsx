import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';

interface Props {}
interface State {
  showControls: boolean;
}

class VideoPlayerComponent extends React.Component<Props, State> {
  private video: HTMLVideoElement | null;
  private videoControls: React.ReactNode;
  constructor(props: Props) {
    super(props);
    this.video = null;
    this.videoControls = null;

    this.state = {
      showControls: false
    };
  }

  componentDidMount(): void {
    const videoWorks = !!this.video?.canPlayType;
    if (videoWorks) {
      //this.video?.controls = false;
      this.showControl(true);
    }
  }

  showControl(condition = false): void {
    this.setState({
      showControls: condition
    });
  }

  renderControls(): React.ReactNode {
    if (this.state.showControls) {
      return <div className={`video-controls`} id="video-controls"></div>;
    }
    return null;
  }

  render(): React.ReactNode {
    return (
      <div className="video-player-component">
        <video
          controls
          className="video"
          id="video"
          preload="metadata"
          poster="poster.jpg"
          ref={(ref): HTMLVideoElement | null => (this.video = ref)}
        >
          <source
            src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/videoplayback.mp4"
            type="video/mp4"
          ></source>
        </video>
        {this.renderControls()}
      </div>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({ }: ApplicationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(VideoPlayerComponent);
