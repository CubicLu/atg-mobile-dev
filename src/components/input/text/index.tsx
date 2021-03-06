import React from 'react';
import { Sizes } from '../../../types';
import { focusInput } from '../../../utils';
interface Props {
  readonly type: 'text' | 'password';
  readonly placeholder: string;
  readonly className?: string;
  readonly defaultValue?: string;
  readonly value?: string;
  readonly onChangeText?: (value) => void;
  readonly error?: boolean;
  readonly size?: Sizes;
  readonly autoFocus: boolean;
}
class InputTextComponent extends React.Component<Props> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  public static defaultProps = {
    error: false,
    size: Sizes.md,
    autoFocus: false
  };

  render(): React.ReactNode {
    const {
      type,
      placeholder,
      defaultValue,
      value,
      onChangeText,
      error,
      size,
      className
    } = this.props;
    return (
      <input
        className={`input text ${error && 'error'} ${size} ${className}`}
        ref={this.inputRef}
        onClick={(e): void => focusInput(e.currentTarget)}
        autoFocus={this.props.autoFocus}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(event): void => {
          let value = event.target.value;
          if (onChangeText) {
            onChangeText(value);
          }
        }}
      />
    );
  }
}

export default InputTextComponent;
