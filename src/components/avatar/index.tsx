/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';

interface Props {
  image: string | undefined;
  type?: 'rounded' | 'circle' | 'normal';
  width?: number;
  height?: number;
  onClick?: any;
}

class AvatarComponent extends React.Component<Props> {
  public static defaultProps = {
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/default-avatar.jpg',
    type: 'normal',
    width: 60,
    height: 60
  };
  render(): React.ReactNode {
    const { onClick, image, type, width, height } = this.props;
    return (
      <div
        onClick={onClick}
        style={{
          backgroundImage: `url(${image})`,
          width: width,
          height: height
        }}
        className={`avatar ${type}`}
      />
    );
  }
}

export default AvatarComponent;
