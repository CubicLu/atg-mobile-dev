import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class SupportStarIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#fcc505',
    width: 24,
    height: 24
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 24 24"
      >
        <defs></defs>
        <circle fill={this.props.color} cx="12" cy="12" r="12" />
        <path
          d="M10,14.216,14.944,17.2l-1.312-5.624L18,7.792,12.248,7.3,10,2,7.752,7.3,2,7.792l4.368,3.784L5.056,17.2Z"
          transform="translate(2 2.086)"
        />
      </svg>
    );
  }
}

export default SupportStarIcon;
