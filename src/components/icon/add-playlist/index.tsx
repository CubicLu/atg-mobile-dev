import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class AddPlaylistIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 20,
    height: 14
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <path
          id="Path_60543"
          data-name="Path 60543"
          d="M14,10H2v2H14Zm0-4H2V8H14Zm4,8V10H16v4H12v2h4v4h2V16h4V14ZM2,16h8V14H2Z"
          transform="translate(-2 -6)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default AddPlaylistIcon;
