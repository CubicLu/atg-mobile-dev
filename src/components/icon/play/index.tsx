import React from 'react';

interface Props {
  stroke: string;
  width: number;
  opacity: number;
  height: number;
}

class PlayIcon extends React.Component<Props> {
  public static defaultProps = {
    width: 24,
    height: 24,
    stroke: '#FFF',
    opacity: 1
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="-2 0 24 24"
      >
        <path
          transform="translate(1 0)"
          overflow="visible"
          fill={this.props.stroke}
          d="M19.09,12a.94.94,0,0,0-.47-.84L3.34,2.09a.91.91,0,0,0-1,0,1,1,0,0,0-.47.84V21.07a1,1,0,0,0,.47.84.91.91,0,0,0,1,0l15.28-9.07a.94.94,0,0,0,.47-.84M21,12a2.92,2.92,0,0,1-1.43,2.53L4.3,23.6A2.87,2.87,0,0,1,0,21.07V2.93A2.87,2.87,0,0,1,4.3.4L19.57,9.47A2.92,2.92,0,0,1,21,12Z"
        />
      </svg>
    );
  }
}

export default PlayIcon;
