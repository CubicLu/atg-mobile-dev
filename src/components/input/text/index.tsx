import React from 'react';
import { Sizes } from '../../../interfaces';
interface Props {
  readonly type: 'text' | 'password';
  readonly placeholder: string;
  readonly defaultValue?: string;
  readonly onChangeText?: (value) => void;
  readonly error?: boolean;
  readonly size?: Sizes;
}
class InputTextComponent extends React.Component<Props> {
  public static defaultProps = {
    error: false,
    size: Sizes.md
  };

  render(): React.ReactNode {
    const {
      type,
      placeholder,
      defaultValue,
      onChangeText,
      error,
      size
    } = this.props;
    return (
      <input
        autoComplete="off"
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
        className={`input text ${error && 'error'} ${size}`}
      />
    );
  }
}

export default InputTextComponent;
