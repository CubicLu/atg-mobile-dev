import React from 'react';
import {
  ArtistInterface,
  ShapesSize,
  Colors,
  Sizes
} from '../../../interfaces';
import { ButtonIcon } from '../..';
import { DotsThreeIcon } from '../../icon';
import EditIcon from '../../icon/edit';
import { IonRouterLink } from '@ionic/react';

interface Props {
  image: string | undefined;
  id: number;
  canEdit: boolean;
  type: ShapesSize;
  video: string | undefined;
  title?: string;
  time: number | string;
  artist?: ArtistInterface;
  size?: Sizes;
  onClick?: Function;
}

class CardVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    size: Sizes.md,
    canEdit: false,
    onClick: (): void => {}
  };

  render(): React.ReactNode {
    const { artist, type, image, time, title, size, id, onClick } = this.props;

    return (
      <div className="row card-out-content">
        <div
          onClick={(): void => onClick && onClick(id)}
          className={`card video ${type} ${size}`}
          data-time={time}
          style={{ backgroundImage: `url(${image})` }}
        >
          {this.props.canEdit && (
            <IonRouterLink
              routerDirection="forward"
              routerLink={`/radio/station/edit/${id}`}
            >
              <div className="flex-justify-content-end pt-1 mr-1">
                <EditIcon opacity={0.33} />
              </div>
            </IonRouterLink>
          )}
        </div>

        {title && <span className="f4 my-1">{title}</span>}
        <br />
        {artist && (
          <div className={'f6 l11 flex-align-items-center'}>
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
