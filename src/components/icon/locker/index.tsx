import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class UnlockedIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 38,
    height: 36
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 38 35.75"
      >
        <g transform="translate(-173 -160)" opacity="1">
          <rect
            width="27"
            height="21"
            rx="2"
            transform="translate(183 173.75)"
            fill="none"
            stroke={this.props.color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M190.5,173.75v-4.5a8.25,8.25,0,0,0-16.5,0v4.5"
            fill="none"
            stroke={this.props.color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </g>
      </svg>
    );
  }
}

export default UnlockedIcon;
