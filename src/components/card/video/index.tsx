import React from 'react';
import { ArtistInterface } from '../../../models';
import { ShapesSize, Colors, Sizes } from '../../../types';
import { ButtonIcon, DotsThreeIcon } from '../..';

interface State {
  orientation: string;
}

interface Props {
  image: string | undefined;
  id: number;
  showFooter?: boolean;
  type?: ShapesSize;
  video: string | undefined;
  title?: string;
  time: number | string;
  artist?: ArtistInterface;
  size?: Sizes;
  onClick?: Function;
}

export default class CardVideoComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      orientation: ''
    };
  }

  render(): React.ReactNode {
    const { artist, type, image, time, title, size, id, onClick } = this.props;
    return (
      <div className="row card-out-content">
        <div
          onClick={(): void => onClick && onClick(id)}
          className={`video-card-container video ${type} ${size}`}
          data-time={time}
        >
          <div className="vertical-video-image-container">
            <img src={image} alt="" />
          </div>
        </div>
        {title && <span className="f4 my-1">{title}</span>}
        <br />
        {this.props.showFooter && (
          <div className={'f6 l11 flex-align-items-center'}>
            <span className="align-start">{artist?.name}</span>
            <span className="align-end">
              <ButtonIcon icon={<DotsThreeIcon />} color={Colors.transparent} />
            </span>
          </div>
        )}
      </div>
    );
  }
}
