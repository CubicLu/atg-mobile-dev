import React from 'react';
import { ShapesSize } from '../../../types';
import { ImageSkeleton } from '../..';

interface Props {
  image: string | undefined;
  key: number;
  type?: ShapesSize;
  col: number;
  label?: string;
  quantity?: number;
  onClick: () => void;
}

export default class CardAlbumGalleryComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.rounded,
    col: 6,
    quantity: 0
  };

  render(): React.ReactNode {
    const { col, onClick, type, image, label, quantity } = this.props;
    return (
      <div className={`col s${col} card album-gallery`}>
        <div onClick={(): void => onClick()}>
          <ImageSkeleton
            className={`image ${type}`}
            src={image!}
            width={'100%'}
            height={165}
            useSkeleton={true}
          />
          <div className="f6 bold mt-15">{label}</div>
          <span>{quantity} items</span>
        </div>
      </div>
    );
  }
}
