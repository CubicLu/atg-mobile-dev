import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class HeartIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 17,
    height: 15
  };

  render(): React.ReactNode {
    return (
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 17.02 15.06"
      >
        <path
          id="Path_73"
          data-name="Path 73"
          d="M12.57.78A4.4,4.4,0,0,1,6.48,2,4.57,4.57,0,0,1,5.28.78,4.35,4.35,0,0,0,.91,5.11c0,5.06,5.83,7.77,8,9.58,2.18-1.81,8-4.52,8-9.58A4.35,4.35,0,0,0,12.57.78Z"
          transform="translate(-0.41 -0.28)"
          fill={this.props.color}
          stroke={this.props.color}
          strokeLinecap={'round'}
          strokeMiterlimit={10}
        />
      </svg>
    );
  }
}

export default HeartIcon;
