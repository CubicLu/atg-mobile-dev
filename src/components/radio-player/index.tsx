import React from 'react';
import { RadioPlayButton } from '../icon/player';
import { RadioPauseButton } from '..';
import { SongInterface } from '../../interfaces';

interface Props {
  title: string | undefined;
  subtitle: string | undefined;
  onPlayClick: Function;
  playing: boolean;
  paused: boolean;
  onPauseClick: Function;
  onResumeClick: Function;
  song: SongInterface | undefined;
}

class RadioPlayerComponent extends React.Component<Props> {
  togglePlayPause(): void {
    if (!this.props.song) this.props.onPlayClick();
    if (this.props.playing) this.props.onPauseClick();
    else this.props.onResumeClick(this.props.song!);
  }
  render(): React.ReactNode {
    return (
      <div className="top-half flex-compass south center-align">
        <div className="flex left-align mx-auto">
          <div className="mr-2" onClick={(): void => this.togglePlayPause()}>
            {this.props.playing ? <RadioPauseButton /> : <RadioPlayButton />}
          </div>
          <div>
            <div className="h0 l08">{this.props.title}</div>
            <div className="h2">{this.props.subtitle}</div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default RadioPlayerComponent;
