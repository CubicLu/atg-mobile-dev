import React from 'react';



interface Props {
  color: string;
  width: number;
  height: number;
  opacity: number;
}

export default class MinimizeIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 32,
    height: 32,
    opacity: 0.25
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <circle
          cx="16"
          cy="16"
          r="16"
          transform="translate(0 32) rotate(-90)"
          opacity={this.props.opacity}
        />
        <g transform="translate(5.337 22.921) rotate(-90)">
          <path
            d="M.278,8.572C.649,8.232,10.925.255,10.925.255a1.013,1.013,0,0,1,1.344,0,.819.819,0,0,1,0,1.231L1.622,9.8a1.012,1.012,0,0,1-1.344,0A.819.819,0,0,1,.278,8.572Z"
            transform="translate(0.122 1.15)"
            fill="#fff"
            stroke="rgba(0,0,0,0)"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <path
            d="M12.87,18,2.094,9.675a.951.951,0,0,0-1.318.031.889.889,0,0,0,.042,1.281l10.777,8.329a.951.951,0,0,0,1.318-.031A.889.889,0,0,0,12.87,18Z"
            transform="translate(-0.401 0.006)"
            fill="#fff"
            stroke="rgba(0,0,0,0)"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
        </g>
      </svg>
    );
  }
}
