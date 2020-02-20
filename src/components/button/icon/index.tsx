import React from 'react';
import {} from './../../';
import {} from './../../../actions';

interface Props {
  onClick: Function;
  icon: any;
  color?: 'transparent' | 'green' | 'transparent-gray' | 'support';
}

class ButtonIconComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    color: 'transparent-gray'
  };

  render(): React.ReactNode {
    return (
      <button
        onClick={this.props.onClick.bind(this)}
        className={`btn icon circle ${this.props.color}`}
      >
        {this.props.icon}
      </button>
    );
  }
}

export default ButtonIconComponent;
