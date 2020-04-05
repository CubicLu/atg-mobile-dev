import React from 'react';

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
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <path
          d="M15,0A15,15,0,1,0,30,15,15,15,0,0,0,15,0Zm.046,22.077h-6.5c0-4.686,4.115-4.685,5.028-5.91l.1-.559a4.478,4.478,0,0,1-2.189-4.051c0-2.415,1.571-4.374,3.509-4.374s3.509,1.958,3.509,4.374a4.494,4.494,0,0,1-2.156,4.036l.119.635c1,1.166,4.98,1.242,4.98,5.849Z"
          transform="translate(1 1)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default ProfileIcon;
