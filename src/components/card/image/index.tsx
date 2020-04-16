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
  diameter?: string;
}

class CardImageComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    col: 6,
    routerDirection: 'forward',
    diameter: '110px'
  };

  render(): React.ReactNode {
    const { col, type, image, label, diameter } = this.props;
    return (
      <div className={`col s${col}`}>
        <IonRouterLink
          routerLink={this.props.routerLink}
          routerDirection={this.props.routerDirection}
        >
          <div
            className={`card image ${type}`}
            style={{
              backgroundImage: `url(${image})`,
              height: diameter,
              width: diameter,
              minHeight: diameter,
              minWidth: diameter
            }}
          />
          <div className="mt-15 f5 center-align">{label}</div>
        </IonRouterLink>
      </div>
    );
  }
}

export default CardImageComponent;
