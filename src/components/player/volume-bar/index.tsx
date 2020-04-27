import React from 'react';
import { connect } from 'react-redux';
import { updateVolume } from './../../../actions/playerActions';
import { ApplicationState } from '../../../reducers';
import { IonRange } from '@ionic/react';
import { VolumeMuteButton, VolumeButton } from '../../icon/player';

class PlayerVolumeComponent extends React.Component<Props> {
  seeking: boolean = false;
  seekRange(e: CustomEvent): void {
    if (this.seeking) return;
    if (!(e.target as Element)?.classList?.contains('range-pressed')) {
      return;
    }
    this.props.updateVolume(e.detail.value);
    console.log('seeking', this.seeking, ' volume', this.props.masterVolume);
    this.seeking = true;
    setTimeout((): boolean => (this.seeking = false), 100);
  }
  render(): React.ReactNode {
    return (
      <div className="player-volume mt-4 flex-align-items-center">
        <span
          className="volume-button"
          onClick={(): void => this.props.updateVolume(0)}
        >
          <VolumeMuteButton />
        </span>

        <IonRange
          mode="ios"
          min={0}
          max={1}
          step={0.05}
          value={this.props.masterVolume}
          onIonChange={(e): void => this.seekRange(e)}
        />

        <span
          className="volume-button"
          onClick={(): void => this.props.updateVolume(1)}
        >
          <VolumeButton />
        </span>
      </div>
    );
  }
}
interface Props extends StateProps, DispatchProps {}
interface DispatchProps {
  updateVolume: (time: number) => void;
}
interface StateProps {
  masterVolume: number;
}
const mapStateToProps = ({ player }: ApplicationState): StateProps => {
  const { masterVolume } = player;
  return { masterVolume };
};
export default connect(mapStateToProps, { updateVolume })(
  PlayerVolumeComponent
);
