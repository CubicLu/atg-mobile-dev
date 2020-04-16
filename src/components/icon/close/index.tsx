import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
  strokeWidth?: number;
}

class CloseIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 16,
    height: 16,
    strokeWidth: 1
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`-0.5 -1 16 16`}
        fill="#ffffff"
      >
        <g>
          <line
            y1="14"
            x2="14"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="14"
            y1="14"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </g>
      </svg>
    );
  }
}

export default CloseIcon;
