import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class BackIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 12,
    height: 18
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="prefix__ic_message_off"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <path
          id="prefix__Union_4"
          d="M-136 6523.382v-20.243l12.694 8.787 12.7-8.787-.054 16.448H-132.5l-3.494 3.793zm12.7-12.957l-.044.028-11.788-8.453h23.659l-11.786 8.456z"
          data-name="Union 4"
          transform="translate(136 -6502)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default BackIcon;
