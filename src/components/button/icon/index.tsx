import React from 'react';
import {} from './../../';
import {} from './../../../actions';

interface Props {
  onClick: Function;
  icon: any;
  color?: 'transparent' | 'green' | 'transparent-gray' | 'support' | 'red';
  type?: 'rounded' | 'circle' | 'normal' | 'full';
  styles?: object;
}

class ButtonIconComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    color: 'transparent-gray',
    type: 'circle'
  };

  render(): React.ReactNode {
    return (
      <button
        onClick={this.props.onClick.bind(this)}
        className={`btn icon ${this.props.type} ${this.props.color}`}
        style={{ ...this.props.styles }}
      >
        {this.props.icon}
      </button>
    );
  }
}

export default ButtonIconComponent;
