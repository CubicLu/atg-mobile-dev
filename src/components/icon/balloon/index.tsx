import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class BalloonIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 16,
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
        viewBox="0 0 16.31 15.57"
      >
        <path
          id="Path_74"
          data-name="Path 74"
          d="M16.31,7c0,3.89-3.65,7-8.16,7a9.29,9.29,0,0,1-2.22-.26,5.08,5.08,0,0,1-3.71,1.75,5.41,5.41,0,0,0,1.11-2.85A6.81,6.81,0,0,1,0,7C0,3.15,3.65,0,8.15,0S16.31,3.15,16.31,7Z"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default BalloonIcon;
