import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class ArrowRightIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 10,
    height: 20
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 10.395 19.728"
      >
        <g id="right-icon" transform="translate(1.414 1.413)">
          <path
            id="Path_60594"
            data-name="Path 60594"
            d="M1682.057-3893.707l7.981,8.625-1.257,1.3-6.724,6.972"
            transform="translate(-1682.057 3893.707)"
            fill="none"
            stroke={this.props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    );
  }
}

export default ArrowRightIcon;
