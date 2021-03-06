import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
  filled: boolean;
}

class SettingsIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 20,
    height: 20,
    filled: true
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={'0 0 25 25'}
      >
        <g transform="translate(-160.5 -97.498)">
          <path
            d="M185,111.476v-3l-3.57-.583a8.67,8.67,0,0,0-.981-2.369l2.081-2.966-2.122-2.12-2.928,2.1a8.642,8.642,0,0,0-2.382-.991L174.476,98h-3l-.578,3.542a8.615,8.615,0,0,0-2.389.981l-2.919-2.085-2.122,2.12,2.054,2.937a8.709,8.709,0,0,0-1,2.4l-3.526.587v3l3.522.625a8.619,8.619,0,0,0,1,2.395l-2.082,2.911,2.121,2.123,2.94-2.06a8.643,8.643,0,0,0,2.389.986l.59,3.544h3l.631-3.553a8.64,8.64,0,0,0,2.375-.995l2.961,2.077,2.121-2.123-2.113-2.935a8.614,8.614,0,0,0,.979-2.369ZM173,114a4,4,0,1,1,4-4A4,4,0,0,1,173,114Z"
            fill={this.props.filled ? this.props.color : undefined}
            stroke={!this.props.filled ? this.props.color : undefined}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
        </g>
      </svg>
    );
  }
}

export default SettingsIcon;
