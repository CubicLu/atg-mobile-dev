import React from 'react';
import { ShapesSize, RouterLinkDirection } from '../../../interfaces';
import { IonRouterLink } from '@ionic/react';

interface Props {
  image: string | undefined;
  key: number;
  type: ShapesSize;
  col: number;
  label?: string;
  routerLink?: string;
  routerDirection: RouterLinkDirection;
}

class CardImageComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    col: 6,
    routerDirection: 'forward'
  };

  render(): React.ReactNode {
    const { col, type, image, label } = this.props;
    return (
      <div className={`col s${col}`}>
        <IonRouterLink
          routerLink={this.props.routerLink}
          routerDirection={this.props.routerDirection}
        >
          <div
            className={`card image ${type}`}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="f5 l2">{label}</div>
        </IonRouterLink>
      </div>
    );
  }
}

export default CardImageComponent;
