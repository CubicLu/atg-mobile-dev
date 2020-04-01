import React from 'react';
import {
  ArtistInterface,
  ShapesSize,
  Colors,
  Sizes
} from '../../../interfaces';
import { ButtonIcon } from '../..';
import { DotsThreeIcon } from '../../icon';

interface Props {
  image: string | undefined;
  key: number;
  type: ShapesSize;
  video: string | undefined;
  title?: string;
  time: number | string;
  artist?: ArtistInterface;
  size?: Sizes;
}

class CardVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    size: Sizes.md
  };

  render(): React.ReactNode {
    const { artist, type, image, time, title, size } = this.props;

    return (
      <div className="row card-out-content">
        <div
          className={`card video ${type} ${size}`}
          data-time={time}
          style={{ backgroundImage: `url(${image})` }}
        />

        {title && <span className="f4 my-1">{title}</span>}
        <br />
        {artist && (
          <div className={'f6 l11 flex-align-center'}>
            <span className="align-start">{artist.name}</span>
            <span className="align-end">
              <ButtonIcon icon={<DotsThreeIcon />} color={Colors.transparent} />
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default CardVideoComponent;
