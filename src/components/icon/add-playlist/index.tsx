import React from 'react';



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
    const { width, height, color } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 20 14`}
      >
        <path
          d="M14,10H2v2H14Zm0-4H2V8H14Zm4,8V10H16v4H12v2h4v4h2V16h4V14ZM2,16h8V14H2Z"
          transform="translate(-2 -6)"
          fill={color}
        />
      </svg>
    );
  }
}

export default AddPlaylistIcon;
