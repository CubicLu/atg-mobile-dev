import React from 'react';
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
