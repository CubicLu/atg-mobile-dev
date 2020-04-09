import React from 'react';
import { RadioPlayButton } from '../icon/player';

interface Props {
  title: string | undefined;
  subtitle: string | undefined;
}

class RadioPlayerComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="top-half flex-compass south center-align">
        <div className="flex left-align mx-auto">
          <div className="mr-2">
            <RadioPlayButton />
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
