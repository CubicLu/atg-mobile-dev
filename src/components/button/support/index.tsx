import React from 'react';
import { Button, ButtonIcon, SupportIcon } from './../../../components';
import {} from './../../../actions';
import { ShapesSize, Colors } from '../../../interfaces';

interface Props {
  buttonType: 'icon' | 'text';
  type?: ShapesSize;
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
    let supported = this.props.supported ? '#FC5F62' : '#FFF';
    let text = this.props.supported ? 'Supported' : 'Support';
    let upppercase = this.props.uppercase ? text.toLocaleUpperCase() : text;

    if (this.props.buttonType === 'icon') {
      return (
        <div className="button-support-component justify-content-center text-center">
          <ButtonIcon
            icon={<SupportIcon color={supported} />}
            color={this.props.supported ? Colors.supported : Colors.support}
          />
          <span className="text-support-icon">{upppercase}</span>
        </div>
      );
    } else {
      return (
        <Button
          onClick={this.props.onClick.bind(this)}
          color={this.props.supported ? Colors.supported : Colors.support}
          label={upppercase}
          type={this.props.type}
          bold={this.props.bold}
        />
      );
    }
  }
}

export default ButtonSupportComponent;
