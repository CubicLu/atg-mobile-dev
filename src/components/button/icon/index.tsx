import React from 'react';
import {} from './../../';
import {} from './../../../actions';
import { ShapesSize, Colors } from '../../../interfaces';

interface Props {
  onClick: Function;
  icon: any;
  color?: Colors;
  type?: ShapesSize;
  styles?: object;
  fixed: boolean;
  label?: string | number;
}

class ButtonIconComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    color: Colors.transparentGray,
    type: 'circle',
    fixed: false
  };

  render(): React.ReactNode {
    const isFixed = this.props.fixed ? ' fixed' : '';
    return (
      <button
        onClick={this.props.onClick.bind(this)}
        className={`btn icon ${this.props.type} ${this.props.color} ${isFixed}`}
        style={{ ...this.props.styles }}
      >
        {this.props.icon}
      </button>
    );
  }
}

export default ButtonIconComponent;
