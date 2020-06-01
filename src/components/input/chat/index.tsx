import React from 'react';

import { InputText, Button } from './../../';
import { Colors, Sizes } from '../../../types';
interface Props {
  onClick: Function;
  onChange: Function;
  placeholder: string;
  label: string;
  defaultValue?: string;
  value?: string;
  className?: string;
}

class InputChatComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    onChange: (): void => {},
    placeholder: 'Start a message',
    label: 'Post'
  };
  render(): React.ReactNode {
    const {
      onClick,
      onChange,
      placeholder,
      label,
      defaultValue,
      value,
      className
    } = this.props;
    return (
      <div className={`input-chat flex-align-items-center ${className}`}>
        <InputText
          size={Sizes.sm}
          className="f7 dark"
          type={'text'}
          placeholder={placeholder}
          onChangeText={(event): void => onChange(event)}
          defaultValue={defaultValue}
          value={value}
        />
        <span className="mb-1">
          <Button
            label={label}
            color={Colors.grayTransparent}
            bold={true}
            onClick={onClick}
          />
        </span>
      </div>
    );
  }
}
export default InputChatComponent;
