import React from 'react';
interface Props {
  type: 'text' | 'password';
  placeholder: string;
  defaultValue?: string;
  onChangeText?: (value) => void;
}
class InputTextComponent extends React.Component<Props> {
  public static defaultProps = {};

  render(): React.ReactNode {
    return (
      <input
        id="inputText"
        type={this.props.type}
        placeholder={this.props.placeholder}
        defaultValue={this.props.defaultValue}
        onChange={(event): void => {
          let value = event.target.value;
          if (this.props.onChangeText) {
            this.props.onChangeText(value);
          }
        }}
        className="input text"
      />
    );
  }
}

export default InputTextComponent;
