import React from 'react';

interface Props {
  image: string | undefined;
  key: number;
  type?: 'normal' | 'rounded' | 'circle' | string;
  col: number;
  label?: string;
  quantity?: number;
  onClick: () => void;
}

class CardAlbumGalleryComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'rounded',
    col: 6,
    quantity: 0
  };
  render(): React.ReactNode {
    return (
      <div
        className={`col s${this.props.col} card album-gallery`}
        onClick={this.props.onClick.bind(this)}
      >
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
