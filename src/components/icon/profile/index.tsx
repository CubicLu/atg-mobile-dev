import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class ProfileIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 32,
    height: 32
  };

  render(): React.ReactNode {
    return (
      <svg
        id="profile"
        data-name="Group 1746"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <path
          id="Path_39747"
          data-name="Path 39747"
          d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm.049,23.548H9.117c0-5,4.39-5,5.364-6.3l.111-.6a4.777,4.777,0,0,1-2.335-4.321c0-2.576,1.676-4.665,3.743-4.665s3.743,2.089,3.743,4.665a4.793,4.793,0,0,1-2.3,4.305l.127.677c1.069,1.244,5.312,1.325,5.312,6.239Z"
          transform="translate(-0.001)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default ProfileIcon;
