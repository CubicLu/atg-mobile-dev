import React from 'react';
interface Props {
  color: string;
  width: number;
  height: number;
}

class DotsThreeIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 16,
    height: 4
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <path
          d="M6,10a2,2,0,1,0,2,2A2.006,2.006,0,0,0,6,10Zm12,0a2,2,0,1,0,2,2A2.006,2.006,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,10Z"
          transform="translate(-4 -10)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default DotsThreeIcon;
