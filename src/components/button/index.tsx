import React from 'react';
import {} from './../';


interface Props {
  onClick: Function;
  label: string;
  id?: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'transparent'
    | 'support'
    | 'disable'
    | 'supported';
  gradient?: boolean;
  bold?: boolean;
  type?: 'rounded' | 'normal' | 'full';
}

class ButtonComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    gradient: false,
    type: 'normal',
    bold: false
  };

  render(): React.ReactNode {
    const { onClick, color, type, label } = this.props;
    let gradient = this.props.gradient ? 'gradient' : '';
    let bold = this.props.bold ? 'bold' : '';
    return (
      <button
        onClick={onClick.bind(this)}
        className={`btn ${color} ${gradient} ${type} ${bold}`}
      >
        {label}
      </button>
    );
  }
}

export default ButtonComponent;
