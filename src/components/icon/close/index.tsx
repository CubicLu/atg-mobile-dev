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
    width: 30,
    height: 30,
    strokeWidth: 1
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <g
          id="Group_44"
          data-name="Group 44"
          transform="translate(0.354 0.354)"
        >
          <line
            id="Line_29"
            data-name="Line 29"
            y1={this.props.width}
            x2={this.props.height}
            transform="translate(0 0)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth={this.props.strokeWidth}
          />
          <line
            id="Line_30"
            data-name="Line 30"
            x1={this.props.width}
            y1={this.props.height}
            transform="translate(0 0)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth={this.props.strokeWidth}
          />
        </g>
      </svg>
    );
  }
}

export default CloseIcon;
