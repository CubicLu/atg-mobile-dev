import React from 'react';



interface Props {
  color: string;
  width: number;
  height: number;
}

class BackIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 12,
    height: 18
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <g transform="translate(-16.823 -63.923)">
          <path
            d="M7.793,17.76.327,10.2a.987.987,0,0,1-.178-.837A1.009,1.009,0,0,1,.193,8.239C.448,7.912,7.545.245,7.545.245a.563.563,0,0,1,.929,0,1.008,1.008,0,0,1,0,1.183L1.362,9.158l7.315,7.409a.99.99,0,0,1,.029,1.164.553.553,0,0,1-.913.029Z"
            transform="translate(16.823 63.923)"
            fill={this.props.color}
          />
        </g>
      </svg>
    );
  }
}

export default BackIcon;
