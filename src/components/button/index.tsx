import React from 'react';
import {} from './../';
import {} from './../../actions';

interface Props {
  onClick: Function;
  label: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  gradient?: boolean;
  full?: boolean;
  bold?: boolean;
}

class ButtonComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    gradient: false,
    full: false,
    bold: false
  };

  render(): React.ReactNode {
    let gradient = this.props.gradient ? 'gradient' : '';
    let full = this.props.full ? 'full' : '';
    let bold = this.props.bold ? 'bold' : '';
    return (
      <button
        onClick={this.props.onClick.bind(this)}
        className={`btn ${this.props.color} ${gradient} ${full} ${bold}`}
      >
        {this.props.label}
      </button>
    );
  }
}

export default ButtonComponent;
