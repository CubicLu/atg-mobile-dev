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
    width: 10,
    height: 20,
    stroke: 2
  };

  render(): React.ReactNode {
    return (
      <svg
        id="arrow-right"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 10.395 19.728"
      >
        <g transform="translate(1.414 1.413)">
          <path
            d="M1682.057-3893.707l7.981,8.625-1.257,1.3-6.724,6.972"
            transform="translate(-1682.057 3893.707)"
            fill="none"
            stroke={this.props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={this.props.stroke}
          />
        </g>
      </svg>
    );
  }
}

export default ArrowRightIcon;
