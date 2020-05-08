import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class LockedIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 28,
    height: 28
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 29 36"
      >
        <g id="lock-black" transform="translate(1 1)">
          <rect
            width="27"
            height="21"
            rx="2"
            transform="translate(0 12.75)"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M190.5,173.75v-4.5a8.25,8.25,0,0,0-16.5,0v4.5"
            transform="translate(-169 -161)"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </g>
      </svg>
    );
  }
}

export default LockedIcon;
