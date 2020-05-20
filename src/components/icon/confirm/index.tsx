import React from 'react';

interface Props {}

export default class ConfirmIcon extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <svg
        id="confirm"
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <path
          d="M1408.957,366.232a24,24,0,1,1-24-24A23.994,23.994,0,0,1,1408.957,366.232Z"
          transform="translate(-1360.957 -342.232)"
          fill="#00a850"
        />
        <path
          d="M47,416.047l7.3,6.6,10.315-16"
          transform="translate(-31.438 -390.25)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }
}
