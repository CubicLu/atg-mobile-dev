import React from 'react';
interface Props {
  type: 'text' | 'password';
  placeholder: string;
  defaultValue?: string;
  onChangeText?: (value) => void;
  error?: boolean;
}
class InputTextComponent extends React.Component<Props> {
  public static defaultProps = {
    error: false
  };

  render(): React.ReactNode {
    const { type, placeholder, defaultValue, onChangeText, error } = this.props;
    return (
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id="inputText"
        onChange={(event): void => {
          let value = event.target.value;
          if (onChangeText) {
            onChangeText(value);
          }
        }}
        className={`input text ${error && 'error'}`}
      />
    );
  }
}

export default InputTextComponent;
