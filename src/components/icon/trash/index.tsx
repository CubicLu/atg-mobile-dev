import React from 'react';



interface Props {
  color: string;
  width: number;
  height: number;
}

class TrashIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 17,
    height: 20
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 17.302 19.981"
      >
        <path
          id="Path_18931"
          data-name="Path 18931"
          d="M6.236,20.761a2.363,2.363,0,0,0,2.472,2.22h9.887a2.363,2.363,0,0,0,2.472-2.22V7.44H6.236ZM22.3,4.11H17.976L16.741,3H10.561L9.325,4.11H5V6.33H22.3Z"
          transform="translate(-5 -3)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default TrashIcon;
