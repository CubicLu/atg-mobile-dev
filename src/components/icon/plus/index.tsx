import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class PlusIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 15,
    height: 15
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 19 19`}
      >
        <g
          id="Group_44"
          data-name="Group 44"
          transform="translate(1 9.485) rotate(-45)"
        >
          <line
            id="Line_29"
            data-name="Line 29"
            y1="12"
            x2="12"
            transform="translate(0 0)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            id="Line_30"
            data-name="Line 30"
            x1="12"
            y1="12"
            transform="translate(0 0)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </g>
      </svg>
    );
  }
}

export default PlusIcon;
