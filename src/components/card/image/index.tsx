import React from 'react';
import { ShapesSize } from '../../../interfaces';

interface Props {
  image: string | undefined;
  key: number;
  type: ShapesSize;
  col: number;
  label?: string;
}

class CardImageComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    col: 6
  };

  render(): React.ReactNode {
    const { col, type, image, label } = this.props;
    return (
      <div className={`col s${col}`}>
        <div
          className={`card image ${type}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="f5 l2">{label}</div>
      </div>
    );
  }
}

export default CardImageComponent;
