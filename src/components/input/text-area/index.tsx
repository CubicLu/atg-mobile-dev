import React from 'react';
import { Sizes } from '../../../interfaces';
interface Props {
  readonly type: 'text' | 'password';
  readonly placeholder: string;
  readonly className?: string;
  readonly defaultValue?: string;
  readonly onChangeText?: (value) => void;
  readonly error?: boolean;
  readonly size?: Sizes;
  readonly autoFocus: boolean;
  readonly rows?: number;
}
export default class InputTextAreaComponent extends React.Component<Props> {
  public static defaultProps = {
    error: false,
    size: Sizes.md,
    autoFocus: false,
    rows: 5
  };

  render(): React.ReactNode {
    const {
      placeholder,
      defaultValue,
      onChangeText,
      error,
      size,
      className
    } = this.props;

    return (
      <textarea
        rows={this.props.rows}
        cols={80}
        className={`input text ${error && 'error'} ${size} ${className}`}
        autoFocus={this.props.autoFocus}
        autoComplete="off"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(event): void => {
          let value = event.currentTarget.value;
          if (onChangeText) {
            onChangeText(value);
          }
        }}
      />
    );
  }
}
