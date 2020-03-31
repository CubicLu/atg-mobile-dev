import React from 'react';
import { ShapesSize } from '../../../interfaces';

interface Props {
  image: string | undefined;
  key: number;
  type?: ShapesSize;
  col: number;
  label?: string;
  quantity?: number;
  onClick: () => void;
}

class CardAlbumGalleryComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.rounded,
    col: 6,
    quantity: 0
  };
  render(): React.ReactNode {
    const { col, onClick, type, image, label, quantity } = this.props;
    return (
      <div
        className={`col s${col} card album-gallery`}
        onClick={onClick.bind(this)}
      >
        <div
          className={`image ${type}`}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="f6 bold">{label}</div>
        <span>{quantity} items</span>
      </div>
    );
  }
}

export default CardAlbumGalleryComponent;
