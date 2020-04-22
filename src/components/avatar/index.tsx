/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { ShapesSize, Colors } from '../../interfaces';

interface Props {
  image: string | undefined;
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
      <div
        onClick={onClick}
        style={{
          backgroundImage: `url(${image})`,
          width: width,
          height: height,
          minWidth: width,
          minHeight: height
        }}
        className={`avatar ${type}`}
      >
        {badge && (
          <div className={`badge ${badgeColor}`}>
            {badgeText && <span>{badgeText}</span>}
          </div>
        )}
      </div>
    );
  }
}

export default AvatarComponent;
