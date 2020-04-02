import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class FullscreenIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 14,
    height: 14
  };

  render(): React.ReactNode {
    return (
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 14 14"
      >
        <path
          id="Path_60546"
          data-name="Path 60546"
          d="M298.6,400.19h3v3h2v-5h-5Zm3-8h-3v2h5v-5h-2Zm6,11h2v-3h3v-2h-5Zm2-11v-3h-2v5h5v-2Z"
          transform="translate(-298.6 -389.19)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default FullscreenIcon;
