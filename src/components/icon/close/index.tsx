import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
  strokeWidth?: number;
}

class CloseIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 15,
    height: 15,
    strokeWidth: 1
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        fill="#ffffff"
      >
        <g transform="translate(0.354 0.354)">
          <line
            y1="13.105"
            x2="13.105"
            transform="translate(0.354 0.354)"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="13.105"
            y1="13.105"
            transform="translate(0.354 0.354)"
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
