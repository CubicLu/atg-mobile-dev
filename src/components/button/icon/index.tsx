import React from 'react';
import { ShapesSize, Colors } from '../../../interfaces';

interface Props {
  onClick: Function;
  icon: any;
  color?: Colors;
  type?: ShapesSize;
  styles?: object;
  fixed: boolean;
  label?: string | number;
  className?: string;
}

class ButtonIconComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    color: Colors.transparentGray,
    type: ShapesSize.circle,
    fixed: false
  };

  render(): React.ReactNode {
    const isFixed = (this.props.fixed && ' fixed') || '';
    const { onClick, type, color, styles, icon, label, className } = this.props;

    return (
      <button
        onClick={(): void => onClick()}
        className={`btn icon ${type} ${color} ${isFixed} ${
          className ? className : ''
        }`}
        style={{ ...styles }}
      >
        {icon}
        {label && <span>{label}</span>}
      </button>
    );
  }
}

export default ButtonIconComponent;
