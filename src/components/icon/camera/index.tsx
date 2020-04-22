import React from 'react';

interface Props {
  width: number;
  height: number;
  opacity: number;
}

export default class CameraImage extends React.Component<Props> {
  public static defaultProps = {
    width: 100,
    height: 100,
    opacity: 1
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 100 100"
      >
        <path
          fill="#fff"
          d="M8.34,0H91.67A8.56,8.56,0,0,1,100,8.77V91.23A8.56,8.56,0,0,1,91.67,100H8.34A8.56,8.56,0,0,1,0,91.23V8.77A8.56,8.56,0,0,1,8.34,0Z"
        />
        <g
          stroke="#6d6e6f"
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1"
        >
          <path d="M67.34,58.07A2.73,2.73,0,0,1,66.57,60a2.59,2.59,0,0,1-1.87.8l-29.11,0A2.68,2.68,0,0,1,33,58l0-16.45a2.69,2.69,0,0,1,2.64-2.73h0l29.11.05a2.68,2.68,0,0,1,2.64,2.74Z" />
          <path d="M61.81,50.08a6.35,6.35,0,1,1-6.34-6.36h0A6.34,6.34,0,0,1,61.81,50.08Z" />
          <path d="M55.49,54.88a4.81,4.81,0,1,1,4.82-4.8A4.81,4.81,0,0,1,55.49,54.88Z" />
          <path d="M44.5,47.21l-7.75,0a.61.61,0,0,1-.59-.63.63.63,0,0,1,.59-.59l7.75,0a.61.61,0,0,1,.61.61A.61.61,0,0,1,44.5,47.21Z" />
          <path d="M42.89,40.71H37.48a.69.69,0,1,1,0-1.37h5.46a.69.69,0,1,1,0,1.37Z" />
          <path d="M61.67,40.82H57.13a1,1,0,0,1,0-2.06h4.54a1,1,0,1,1,0,2Z" />
          <path d="M44.44,50.19H36.69a.61.61,0,0,1-.61-.61.61.61,0,0,1,.61-.61l7.75,0a.61.61,0,1,1,0,1.21Z" />
          <path d="M44.49,53.18H36.74a.61.61,0,0,1,0-1.22h7.75a.61.61,0,0,1,.61.61A.61.61,0,0,1,44.49,53.18Z" />
        </g>
      </svg>
    );
  }
}
