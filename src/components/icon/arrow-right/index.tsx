import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
  stroke: number;
}

class ArrowRightIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 12,
    height: 24,
    stroke: 2
  };

  render(): React.ReactNode {
    return (
      <svg
        style={{ overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 12 20"
        preserveAspectRatio="xMidYMin"
      >
        <path
          overflow="visible"
          fill="none"
          stroke={this.props.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={this.props.stroke}
          d="M0,16,8,7.835,6.74,6.6,0,0"
          transform="translate(2 5)"
        />
      </svg>
    );
  }
}

export default ArrowRightIcon;
