import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateElapsed, seekSongPosition } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { SongInterface } from '../../../interfaces';
import { IonRange } from '@ionic/react';

class PlayerProgressBarComponent extends React.Component<Props> {
  seeking: boolean = false;
  public static defaultProps = {
    displayInfo: true,
    seekDisabled: false,
    timeElapsed: 0
  };
  seekSong(newPosition: number): void {
    this.props.seekSongPosition(newPosition);
  }
  seekRange(e: CustomEvent): void {
    if (this.props.seekDisabled) return;
    if (this.seeking) return;
    if (!(e.target as Element)?.classList?.contains('range-pressed')) {
      return;
    }
    this.seeking = true;
    setTimeout((): boolean => (this.seeking = false), 200);
    this.props.seekSongPosition(e.detail.value);
    this.forceUpdate();
  }
  render(): React.ReactNode {
    const disabled = this.props.seekDisabled ? 'disabled' : '';
    return (
      <React.Fragment>
        <IonRange
          mode="ios"
          className={`bar ${disabled}`}
          value={this.props.timeElapsed}
          min={0}
          max={this.props.duration}
          onIonChange={(e): void => this.seekRange(e)}
        />

        {this.props.displayInfo && (
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
                .second(this.props.duration)
                .format('m:ss')}
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}
interface Props extends StateProps, DispatchProps {
  displayInfo: boolean;
  seekDisabled: boolean;
  duration: number;
}
interface DispatchProps {
  updateElapsed: (time: number) => void;
  seekSongPosition: (time: number) => void;
}
interface StateProps {
  playing: boolean;
  paused: boolean;
  timeElapsed: number;
  duration: number;
  canSkip: boolean;
  playerAction?: string;
  song?: SongInterface;
}
const mapStateToProps = ({ player }: ApplicationState): StateProps => {
  const {
    playing,
    paused,
    timeElapsed,
    duration,
    canSkip,
    playerAction
  } = player;
  return {
    playing,
    paused,
    timeElapsed,
    duration,
    canSkip,
    playerAction
  };
};
export default connect(mapStateToProps, {
  updateElapsed,
  seekSongPosition
})(PlayerProgressBarComponent);
