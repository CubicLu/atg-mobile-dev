import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class SupportIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 18,
    height: 24
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <g>
          <path
            d="M13,4.628V2.555a1.555,1.555,0,0,1,3.109,0V4.628"
            transform="translate(-5.781)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <path
            d="M19,4.628V2.555a1.555,1.555,0,0,1,3.109,0V4.628"
            transform="translate(-8.672)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <path
            d="M10.109,6.182A1.555,1.555,0,1,1,7,6.182V2.555a1.555,1.555,0,0,1,3.109,0Z"
            transform="translate(-2.891)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <path
            d="M4.109,8.182A1.527,1.527,0,0,1,2.555,9.737,1.527,1.527,0,0,1,1,8.182V4.555A1.527,1.527,0,0,1,2.555,3,1.527,1.527,0,0,1,4.109,4.555Z"
            transform="translate(0 -0.964)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <path
            d="M13.518,17.846V16.81a5.684,5.684,0,0,1,5.7-5.7H15.073A2.079,2.079,0,0,1,13,9.036V8h7.255a2.079,2.079,0,0,1,2.073,2.073v4.146a6.337,6.337,0,0,1-1.3,3.835l-1.658,2.125A3.193,3.193,0,0,0,18.7,22.1v6.633"
            transform="translate(-5.781 -3.372)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <path
            d="M1,13v5.182a8,8,0,0,0,1.555,4.664v8.292"
            transform="translate(0 -5.781)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <line
            y2="1"
            transform="translate(7 19)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <line
            y2="4"
            transform="translate(7 21)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <line
            x2="2"
            transform="translate(3 17)"
            fill="none"
            stroke={this.props.color}
            strokeMiterlimit="10"
            strokeWidth="1"
          />
        </g>
      </svg>
    );
  }
}

export default SupportIcon;
