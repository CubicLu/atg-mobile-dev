import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class CheckIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 98,
    height: 98
  };

  render(): React.ReactNode {
    return (
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 98 98"
      >
        <circle
          id="Ellipse_40"
          data-name="Ellipse 40"
          cx="49"
          cy="49"
          r="48"
          fill="none"
          stroke={this.props.color}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
          strokeWidth={2}
        />
        <path
          id="Path_38"
          data-name="Path 38"
          d="M14.23,48.91,37.47,72.15,81,28.64"
          transform="translate(1 -0.82)"
          fill="none"
          stroke={this.props.color}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
          strokeWidth={2}
        />
      </svg>
    );
  }
}

export default CheckIcon;
