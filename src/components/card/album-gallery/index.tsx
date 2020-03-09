import React from 'react';

interface Props {
  image: string | undefined;
  key: number;
  type: 'normal' | 'rounded' | 'circle';
  col: number;
  label?: string;
  quantity?: number;
}

class CardAlbumGalleryComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'rounded',
    col: 6,
    quantity: 0
  };
  render(): React.ReactNode {
    return (
      <div className={`col s${this.props.col} card album-gallery`}>
        <div
          className={`image ${this.props.type}`}
          style={{ backgroundImage: `url(${this.props.image})` }}
        ></div>
        <div className="label">{this.props.label}</div>
        <span>{this.props.quantity} items</span>
      </div>
    );
  }
}

export default CardAlbumGalleryComponent;
