import React from 'react';
import { ArtistInterface } from '../../../models';
import { ShapesSize, Colors, Sizes } from '../../../types';
import { ButtonIcon, DotsThreeIcon } from '../..';

interface Props {
  image: string | undefined;
  id: number;
  canEdit: boolean;
  showFooter: boolean;
  type: ShapesSize;
  video: string | undefined;
  title?: string;
  time: number | string;
  artist?: ArtistInterface;
  size?: Sizes;
  onClick?: Function;
}

export default class CardVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    showFooter: false,
    size: Sizes.md,
    canEdit: false,
    onClick: (): void => {}
  };

  render(): React.ReactNode {
    const { artist, type, image, time, title, size, onClick } = this.props;

    return (
      <div className="row card-out-content">
        <div
          onClick={(): void => onClick && onClick()}
          className={`card video ${type} ${size}`}
          data-time={time}
          style={{ backgroundImage: `url(${image})` }}
        />

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
