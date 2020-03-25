import React from 'react';
import {} from './../';
import { ShapesSize, Colors } from '../../interfaces';

interface Props {
  onClick: Function;
  label?: string;
  id?: string;
  color?: Colors;
  gradient?: boolean;
  bold?: boolean;
  type?: ShapesSize;
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
    return (
      <button
        onClick={onClick.bind(this)}
        className={`btn ${color} ${gradient} ${type} ${bold}`}
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
