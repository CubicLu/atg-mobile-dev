import React from 'react';
import { ArtistInterface } from '../../../interfaces';
import { ButtonIcon } from '../..';
import { DotsThreeIcon } from '../../icon';

interface Props {
  image: string | undefined;
  key: number;
  type: 'normal' | 'rounded';
  video: string | undefined;
  title: string;
  time: number;
  artist: ArtistInterface;
}

class CardVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'normal'
  };

  render(): React.ReactNode {
    return (
      <div>
        <div
          className={`card video ${this.props.type}`}
          data-time={this.props.time}
          style={{ backgroundImage: `url(${this.props.image})` }}
        ></div>
        <div className="row card-out-content">
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <h1 className="title">{this.props.title}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col s12 button">
                <h1 className={'artist'}>{this.props.artist.name}</h1>
                <ButtonIcon icon={<DotsThreeIcon />} color={'transparent'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardVideoComponent;
