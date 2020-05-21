import React from 'react';

interface Props {
  color?: string;
  width?: number | 16;
  height?: number;
  opacity?: number;
}

export default class PauseIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#000',
    width: 16,
    height: 20,
    opacity: 0.5
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={'0 0 16 20'}
      >
        <g transform="translate(-11 -9)">
          <rect
            width="5"
            height="20"
            rx="3"
            transform="translate(22 9)"
            opacity={this.props.opacity}
            fill={this.props.color}
          />
          <rect
            width="5"
            height="20"
            rx="3"
            transform="translate(11 9)"
            opacity={this.props.opacity}
            fill={this.props.color}
          />
        </g>
      </svg>
    );
  }
}
