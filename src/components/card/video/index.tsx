import React from 'react';
import { ArtistInterface, ShapesSize, Colors } from '../../../interfaces';
import { ButtonIcon } from '../..';
import { DotsThreeIcon } from '../../icon';

interface Props {
  image: string | undefined;
  key: number;
  type: ShapesSize;
  video: string | undefined;
  title: string;
  time: number;
  artist: ArtistInterface;
}

class CardVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal
  };

  render(): React.ReactNode {
    const { artist, type, image, time, title } = this.props;
    if (!artist) return <div />;

    return (
      <div>
        <div
          className={`card video ${type}`}
          data-time={time}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="row card-out-content">
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <h1 className="title">{title}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col s12 button">
                <h1 className={'artist'}>{artist.name}</h1>
                <ButtonIcon
                  icon={<DotsThreeIcon />}
                  color={Colors.transparent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardVideoComponent;
