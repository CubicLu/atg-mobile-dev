import React from 'react';
import {} from './../../';
import {} from './../../../actions';

interface Props {
  onClick: Function;
  icon: any;
  color?:
    | 'transparent'
    | 'green'
    | 'transparent-gray'
    | 'support'
    | 'red'
    | 'supported';
  type?: 'rounded' | 'circle' | 'normal' | 'full';
  styles?: object;
  fixed: boolean;
}

class ButtonIconComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    color: 'transparent-gray',
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
