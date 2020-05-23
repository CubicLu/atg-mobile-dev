/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { ShapesSize, Colors } from '../../types';
import { IonRouterLink } from '@ionic/react';
import { ImageSkeleton } from '..';

interface Props {
  image: string | undefined;
  avatarUrl?: string | undefined;
  type?: ShapesSize;
  width?: number;
  height?: number;
  onClick?: any;
  badge?: boolean;
  badgeText?: string;
  badgeColor?: Colors;
}

class AvatarComponent extends React.Component<Props> {
  public static defaultProps = {
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/default-avatar.jpg',
    type: ShapesSize.normal,
    width: 60,
    height: 60,
    badge: false
  };
  render(): React.ReactNode {
    const {
      onClick,
      image,
      type,
      width,
      height,
      badge,
      badgeColor,
      badgeText
    } = this.props;
    return (
      <IonRouterLink routerLink={this.props.avatarUrl}>
        <div className={`avatar ${type}`} onClick={onClick}>
          <ImageSkeleton
            className={`avatar ${type}`}
            src={image || ''}
            width={width}
            height={height}
            useSkeleton={true}
          />
          {badge && (
            <div className={`badge ${badgeColor}`}>
              {badgeText && <span>{badgeText}</span>}
            </div>
          )}
        </div>
      </IonRouterLink>
    );
  }
}

export default AvatarComponent;
