import React from 'react';
interface Props {
  color: string;
  width: number;
  height: number;
}

export default class InfoTrackIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 20,
    height: 14
  };

  render(): React.ReactNode {
    const { color } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26.525"
        height="26.525"
        viewBox="0 0 26.525 26.525"
      >
        <g>
          <path
            d="M24,12A12,12,0,1,1,12,0,12,12,0,0,1,24,12Z"
            transform="translate(24.744 0) rotate(87)"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
          <line
            y1="8"
            x2="8"
            transform="translate(13.386 6.764) rotate(45)"
            fill="none"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <line
            x1="8"
            y1="8"
            transform="translate(13.386 6.764) rotate(45)"
            fill="none"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
        </g>
      </svg>
    );
  }
}
