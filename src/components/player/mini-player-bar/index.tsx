import React from 'react';
import {
  PauseIcon,
  StarIcon,
  NextIcon,
  PlayIcon,
  PlayerProgress
} from './../../../components';
import { IonSpinner } from '@ionic/react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { SongInterface } from '../../../interfaces';

class MiniPlayerBarComponent extends React.PureComponent<Props> {
  minibarElastic(): React.ReactNode {
    return (
      <div className="pull">
        <svg
          width="400"
          height="10"
          viewBox="0 0 400 10"
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
  playerProgressRange(): React.ReactNode {
    return (
      <div className="player-progress mini">
        <PlayerProgress displayInfo={false} seekDisabled={true} />
      </div>
    );
  }
  playerContent(): React.ReactNode {
    const { song } = this.props;
    const disabled = !song;

    return (
      <div className="mini-bar">
        <div
          className="mini-bar-left"
          onClick={(): void => this.props.togglePlayer()}
        />
        <div
          className="mini-bar-content flex-compass fluid"
          onClick={(): void => this.props.togglePlayer()}
        >
          <span className="mini-bar-text f7">{song?.title}</span>
          <span className="mini-bar-text f7 neue">{song?.artist}</span>
        </div>

        <div className="mini-right-button">
          <button
            className={song?.favorite ? 'favorite' : ''}
            disabled={disabled}
            onClick={(): void => this.props.favoriteSong()}
          >
            <StarIcon />
          </button>
        </div>
        <div className="mini-right-button mr-1">
          <button
            disabled={disabled}
            onClick={(): void => this.props.clickNextSong()}
          >
            <NextIcon />
          </button>
        </div>
      </div>
    );
  }
  playerCover(): React.ReactNode {
    const { song, starting, playing } = this.props;
    const disabled = !song;

    return (
      <div className="cover">
        <div
          className="img"
          style={{
            backgroundSize: 'cover',
            backgroundPositionY: 'center',
            background: disabled ? '#1a0922cc' : `url(${song?.cover})`
          }}
        >
          <div className="icon">
            {starting && <IonSpinner className="blue-spin" name="crescent" />}
            {playing ? (
              <button
                disabled={disabled}
                className="mini-player-toggle p-0"
                onClick={(): void => this.props.pauseSong()}
              >
                <PauseIcon width={13} height={18} color="#fff" opacity={0.75} />
              </button>
            ) : (
              <button
                disabled={disabled}
                className="mini-player-toggle p-0"
                onClick={(): void => this.props.resumeSong()}
              >
                <PlayIcon opacity={0.75} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  render(): React.ReactNode {
    const active = this.props.song ? 'active' : '';
    return (
      <div id="player" className={`mini-player ${active}`}>
        {this.minibarElastic()}
        {this.playerProgressRange()}
        {this.playerCover()}
        {this.playerContent()}
      </div>
    );
  }
}
//from parent
interface Props extends StateProps {
  togglePlayer: () => void;
  favoriteSong: () => void;
  clickNextSong: () => void;
  pauseSong: () => void;
  resumeSong: () => void;
}
//from state
interface StateProps {
  song?: SongInterface;
  starting: boolean;
  playing: boolean;
  paused: boolean;
  canSkip: boolean;
  expanded: boolean;
}
const mapStateToProps = ({ player }: ApplicationState): StateProps => {
  const { song, starting, playing, paused, canSkip, expanded } = player;
  return {
    playing,
    starting,
    paused,
    song,
    canSkip,
    expanded
  };
};
export default connect(mapStateToProps)(MiniPlayerBarComponent);
