import React from 'react';
import { Button, ButtonIcon, SupportIcon } from './../../../components';
interface Props {
  buttonType: 'icon' | 'text';
  type?: 'rounded' | 'normal' | 'full';
  onClick: Function;
  supported: boolean;
  uppercase?: boolean;
  bold?: boolean;
}

class ButtonSupportComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'icon',
    onClick: (): void => {},
    supported: false,
    uppercase: false,
    bold: false
  };

  render(): React.ReactNode {
    const {
      onClick,
      supported,
      type,
      bold,
      buttonType,
      uppercase
    } = this.props;

    if (buttonType === 'icon') {
      return (
        <div className="button-support-component">
          <ButtonIcon
            icon={<SupportIcon color={supported ? '#FC5F62' : '#FFF'} />}
            color={supported ? 'supported' : 'support'}
          />
          <span className={`text-support-icon${uppercase ? 'uppercase ' : ''}`}>
            {supported ? 'Supported' : 'Support'}
          </span>
        </div>
      );
    } else {
      return (
        <Button
          onClick={onClick.bind(this)}
          color={supported ? 'supported' : 'support'}
          label={supported ? 'Supported' : 'Support'}
          type={type}
          bold={bold}
        />
      );
    }
  }
}

export default ButtonSupportComponent;
