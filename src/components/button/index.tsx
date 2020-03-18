import React from 'react';
import {} from './../';
import {} from './../../actions';

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
    | 'disable';
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
    let gradient = this.props.gradient ? 'gradient' : '';
    let bold = this.props.bold ? 'bold' : '';
    return (
      <button
        onClick={this.props.onClick.bind(this)}
        className={`btn ${this.props.color} ${gradient} ${this.props.type} ${bold}`}
      >
        {this.props.label}
      </button>
    );
  }
}

export default ButtonComponent;
