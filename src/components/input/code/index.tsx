import React from 'react';
import { UnlockedIcon } from './../../../components';

import {} from '../../icon';
interface Props {
  onKeyUp: Function;
  isValid: boolean;
}
interface State {
  value: string;
}

class InputCodeComponent extends React.Component<Props, State> {
  public static defaultProps = {
    onKeyUp: (): void => {}
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render(): React.ReactNode {
    return (
      <div className="enter-code-component">
        <div className="input-group">
          <div className="input-group-area">
            <input
              type="tel"
              className="input code"
              defaultValue={this.state.value}
              maxLength={6}
              onKeyUp={this.props.onKeyUp.bind(this)}
            />
          </div>
          <div className="input-group-icon">
            <UnlockedIcon color={'#000'} />
          </div>
        </div>
        {this.props.isValid === false && (
          <p className="message warning">Token is not valid</p>
        )}
      </div>
    );
  }
}

export default InputCodeComponent;
