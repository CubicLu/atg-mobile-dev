import React from 'react';
import {} from './../../';
import {} from './../../../actions';

interface Props {
  onClick: Function;
  icon: string;
}

class ButtonIconComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {}
  };

  render(): React.ReactNode {
    return (
      <button
        onClick={this.props.onClick.bind(this)}
        className={`btn icon circle`}
      >
        <i className="material-icons">x</i>
      </button>
    );
  }
}

export default ButtonIconComponent;
