import React from 'react';
import { Sizes } from '../../../interfaces';
import { focusInput } from '../../../utils';
interface Props {
  readonly type: 'text' | 'password';
  readonly placeholder: string;
  readonly defaultValue?: string;
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

  componentDidMount(): void {
    // this.inputRef.current && focusInput(this.inputRef.current);
  }
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
        ref={this.inputRef}
        onClick={(e): void => focusInput(e.currentTarget)}
        autoFocus={this.props.autoFocus}
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
