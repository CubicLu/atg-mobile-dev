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
    const { onClick, type, color, styles, icon, label } = this.props;

    return (
      <button
        onClick={onClick.bind(this)}
        className={`btn icon ${type} ${color} ${isFixed}`}
        style={{ ...styles }}
      >
        {icon}
        {label && <span>{label}</span>}
      </button>
    );
  }
}

export default ButtonIconComponent;
