import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class StarIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 20,
    height: 19
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 20 19`}
      >
        <path
          id="Path_4025"
          data-name="Path 4025"
          d="M22,9.24l-7.19-.62L12,2,9.19,8.63,2,9.24l5.46,4.73L5.82,21,12,17.27,18.18,21l-1.63-7.03ZM12,15.4,8.24,17.67l1-4.28L5.92,10.51l4.38-.38L12,6.1l1.71,4.04,4.38.38L14.77,13.4l1,4.28Z"
          transform="translate(-2 -2)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default StarIcon;
