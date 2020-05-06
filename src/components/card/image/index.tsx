import React from 'react';
import { ShapesSize, RouterLinkDirection } from '../../../types';
import { IonRouterLink, IonCheckbox } from '@ionic/react';
import { CloseIcon } from '../..';

interface Props {
  image: string | undefined;
  className?: string;
  key: number;
  type: ShapesSize;
  col: number;
  label?: string;
  innerContent?: React.ReactElement;
  routerLink?: string;
  routerDirection: RouterLinkDirection;
  diameter?: string;
  selected?: boolean;
  selectAction?: Function;
  canRemove?: boolean;
  removeAction?: Function;
}

class CardImageComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    col: 6,
    routerDirection: 'forward'
  };

  render(): React.ReactNode {
    const {
      col,
      type,
      image,
      label,
      diameter,
      selectAction,
      removeAction,
      className
    } = this.props;
    return (
      <div className={`col s${col}`}>
        <IonRouterLink
          routerLink={this.props.routerLink}
          routerDirection={this.props.routerDirection}
        >
          <div
            className={`card image ${type} ${className}`}
            style={{
              backgroundImage: `url(${image})`,
              height: diameter,
              width: diameter,
              minHeight: diameter,
              minWidth: diameter
            }}
          >
            {this.props.canRemove && (
              <div
                className="flex-compass north east p-1 btn-close"
                onClick={(): void => removeAction && removeAction()}
              >
                <CloseIcon />
              </div>
            )}

            {this.props.selected !== undefined && (
              <div className={'flex-compass south east p-1 mt-1'}>
                <IonCheckbox
                  mode="ios"
                  color="secondary"
                  checked={this.props.selected}
                  onClick={(e): void => selectAction && selectAction(e.target)}
                  style={{
                    '--checkmark-width': '3px',
                    '--background': '#ffffff30'
                  }}
                />
              </div>
            )}

            {this.props.innerContent}
          </div>
          <div className="mt-15 f5 center-align" style={{ width: diameter }}>
            {label}
          </div>
        </IonRouterLink>
      </div>
    );
  }
}

export default CardImageComponent;
