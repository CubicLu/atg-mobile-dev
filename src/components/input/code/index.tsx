import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';
interface Props {}
interface State {
  value: string;
}

class InputCodeComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render(): React.ReactNode {
    return (
      <div className="input-group">
        <div className="input-group-area">
          <input
            type="tel"
            className="input code"
            defaultValue={this.state.value}
            maxLength={6}
          />
        </div>
        <div className="input-group-icon">@</div>
      </div>
    );
  }
}

export default InputCodeComponent;
