/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import {} from './../../components';
import {} from './../../actions';
const AvatarDefaultImage = require('./../../assets/img/avatar/default.jpg');

interface Props {
  image: string | undefined;
  type?: 'rounded' | 'circle' | 'normal';
  width?: number;
  height?: number;
}

class AvatarComponent extends React.Component<Props> {
  public static defaultProps = {
    image: AvatarDefaultImage,
    type: 'normal',
    width: 60,
    height: 60
  };
  render(): React.ReactNode {
    return (
      <div
        style={{
          backgroundImage: `url(${this.props.image})`,
          width: this.props.width,
          height: this.props.height
        }}
        className={`avatar ${this.props.type}`}
      ></div>
    );
  }
}

export default AvatarComponent;
