import React from 'react';

interface Props {
  onClick: Function;
  icon: any;
  color?:
    | 'transparent'
    | 'green'
    | 'transparent-gray'
    | 'support'
    | 'red'
    | 'supported'
    | 'orange';
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
    const isFixed = (this.props.fixed && ' fixed') || '';
    const { onClick, type, color, styles, icon } = this.props;

    return (
      <button
        onClick={onClick.bind(this)}
        className={`btn icon ${type} ${color} ${isFixed}`}
        style={{ ...styles }}
      >
        {icon}
      </button>
    );
  }
}

export default ButtonIconComponent;
