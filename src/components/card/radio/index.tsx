import React from 'react';
import { ShapesSize, Sizes } from '../../../types';
import { EditIcon } from '../..';
import { IonRouterLink } from '@ionic/react';

interface Props {
  image?: string;
  id: number;
  canEdit: boolean;
  type: ShapesSize;
  size?: Sizes;
}

class CardRadioComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    size: Sizes.md,
    canEdit: false,
  };

  render(): React.ReactNode {
    const { type, image, size, id } = this.props;

    return (
      <div className="row card-out-content">
        <div
          className={`card video ${type} ${size}`}
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
      </div>
    );
  }
}

export default CardRadioComponent;
