import React from 'react';
import {} from './../';
import { ShapesSize, Colors, GradientDirection } from '../../interfaces';

interface Props {
  onClick: Function;
  label: string;
  id?: string;
  color?: Colors;
  gradient?: boolean;
  bold?: boolean;
  type?: ShapesSize;
  gradientDirection?: GradientDirection;
}

class ButtonComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    gradient: false,
    type: ShapesSize.normal,
    bold: false
  };

  render(): React.ReactNode {
    const { onClick, color, type, label } = this.props;
    let gradient = this.props.gradient ? 'gradient' : '';
    let bold = this.props.bold ? 'bold' : '';
    let gradientDirection = this.props.gradientDirection
      ? this.props.gradientDirection
      : GradientDirection.horizontal;
    return (
      <button
        onClick={onClick.bind(this)}
        className={`btn ${color} ${gradient} ${gradientDirection} ${type} ${bold}`}
      >
        {label}
      </button>
    );
  }
}

export default ButtonComponent;
