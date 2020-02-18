import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  type: 'text' | 'password';
  placeholder: string;
}

class InputTextComponent extends React.Component<Props> {
  public static defaultProps = {};

  render(): React.ReactNode {
    return <input {...this.props} className="input text" />;
  }
}

export default InputTextComponent;
