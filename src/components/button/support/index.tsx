import React from 'react';
import { Button, ButtonIcon, SupportIcon } from './../../../components';
import { ShapesSize, Colors } from '../../../interfaces';

interface Props {
  buttonType: 'icon' | 'text';
  type?: ShapesSize;
  onClick: Function;
  supported: boolean;
  uppercase?: boolean;
  bold?: boolean;
  id: string;
}

class ButtonSupportComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'icon',
    onClick: (): void => {},
    supported: false,
    uppercase: false,
    bold: false,
    id: 'support-button'
  };

  render(): React.ReactNode {
    const {
      onClick,
      supported,
      type,
      bold,
      buttonType,
      uppercase,
      id
    } = this.props;

    if (buttonType === 'icon') {
      return (
        <div id={id} className="button-support-component">
          <ButtonIcon
            icon={<SupportIcon color={supported ? '#FC5F62' : '#fff'} />}
            color={supported ? Colors.supported : Colors.support}
          />
          <span className={`text-support-icon${uppercase ? 'uppercase ' : ''}`}>
            {supported ? 'Supported' : 'Support'}
          </span>
        </div>
      );
    } else {
      return (
        <Button
          id={id}
          className="mt-0"
          onClick={onClick.bind(this)}
          color={supported ? Colors.supported : Colors.support}
          label={supported ? 'Supported' : 'Support'}
          type={type}
          bold={bold}
        />
      );
    }
  }
}

export default ButtonSupportComponent;
