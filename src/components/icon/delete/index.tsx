import React from 'react';

interface Props {}

export default class DeleteIcon extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <path
          d="M1408.957,366.232a24,24,0,1,1-24-24A23.994,23.994,0,0,1,1408.957,366.232Z"
          transform="translate(-1360.957 -342.232)"
          fill="red"
        />
        <line
          y1="14.743"
          x2="14.743"
          transform="translate(16.63 17.088)"
          fill="none"
          stroke="#fff"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          x1="14.743"
          y1="14.743"
          transform="translate(16.63 17.088)"
          fill="none"
          stroke="#fff"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </svg>
    );
  }
}
