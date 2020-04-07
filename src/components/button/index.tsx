import React from 'react';
import {} from './../';
import { ShapesSize, Colors, GradientDirection, Sizes } from '../../interfaces';

interface Props {
  onClick: Function;
  label?: string;
  className?: string;
  id?: string;
  color?: Colors;
  bold?: boolean;
  type?: ShapesSize;
  size?: Sizes;
  gradient?: boolean;
  gradientDirection?: GradientDirection;
}

class ButtonComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    gradient: false,
    type: ShapesSize.normal,
    bold: false,
    size: Sizes.md
  };

  render(): React.ReactNode {
    const { onClick, color, type, label, id } = this.props;
    let pattern = this.props.gradient ? 'gradient ' : '';
    pattern += this.props.bold ? 'bold ' : '';
    pattern += this.props.size !== Sizes.md && Sizes.lg ? 'large ' : '';
    pattern += this.props.className ? this.props.className : ' ';
    if (this.props.gradient) {
      pattern += ' ';
      pattern += this.props.gradientDirection
        ? this.props.gradientDirection
        : GradientDirection.horizontal;
    }
    return (
      <button
        id={id || 'btn-id'}
        onClick={(): void => onClick()}
        className={`btn ${type} ${color} ${pattern.trim()}`}
      >
        {label}
      </button>
    );
  }
}

export default ButtonComponent;
