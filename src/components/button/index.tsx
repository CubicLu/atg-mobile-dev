import React from 'react';
import {} from './../';
import { ShapesSize, Colors, GradientDirection, Sizes } from '../../interfaces';

interface Props {
  onClick: Function;
  label?: string;
  id?: string;
  color?: Colors;
  gradient?: boolean;
  bold?: boolean;
  type?: ShapesSize;
  size?: Sizes;
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
    let gradient = this.props.gradient ? 'gradient' : '';
    let bold = this.props.bold ? 'bold' : '';
    let size = this.props.size !== Sizes.md && Sizes.lg ? 'large' : '';
    let gradientDirection = this.props.gradientDirection
      ? this.props.gradientDirection
      : GradientDirection.horizontal;
    const buttonId = id || 'btn-id';
    return (
      <button
        id={buttonId}
        onClick={onClick.bind(this)}
        className={`btn ${color} ${size} ${gradient} ${gradientDirection} ${type} ${bold}`}
      >
        {label}
        {type === ShapesSize.viewAll && (
          <span className="view-all">
            View All<span className="arrow-next">&nbsp;&rsaquo;</span>
          </span>
        )}
      </button>
    );
  }
}

export default ButtonComponent;
