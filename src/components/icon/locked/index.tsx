import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class LockedIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 38,
    height: 36
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="35.75"
        viewBox="0 0 29 35.75"
      >
        <g id="lock-black" transform="translate(1 1)">
          <rect
            id="Rectangle_599"
            data-name="Rectangle 599"
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
            id="Path_51626"
            data-name="Path 51626"
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
