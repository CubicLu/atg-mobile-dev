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
      <div>
        <div
          className={`card video ${type} ${size}`}
          data-time={time}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="row card-out-content">
          <div className="col s12">
            {title && (
              <div className="row">
                <div className="col s12">
                  <h1 className="title">{title}</h1>
                </div>
              </div>
            )}
            {artist && (
              <div className="row">
                <div className="col s12 button">
                  <h1 className={'artist'}>{artist.name}</h1>
                  <ButtonIcon
                    icon={<DotsThreeIcon />}
                    color={Colors.transparent}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CardVideoComponent;
