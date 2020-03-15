import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color?: string;
  width?: number | 16;
  height?: number;
  opacity?: number;
}

class BlankIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#000',
    width: 16,
    height: 20,
    opacity: 0.5
  };

  render(): React.ReactNode {
    let size = this.props.width ? this.props.width - 10 : 6;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <g transform="translate(-527 4470)">
          <rect
            width={size}
            height={this.props.height}
            rx="3"
            transform="translate(527 -4470)"
            opacity={this.props.opacity}
          />
          <rect
            width={size}
            height={this.props.height}
            rx="3"
            transform="translate(537 -4470)"
            opacity={this.props.opacity}
          />
        </g>
      </svg>
    );
  }
}

export default BlankIcon;
