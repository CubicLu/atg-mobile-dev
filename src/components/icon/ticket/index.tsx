import React from 'react';



interface Props {
  color: string;
  width: number;
  height: number;
}

class TicketIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 34,
    height: 34
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 33.941 33.941"
      >
        <g id="local_play-24px" transform="translate(0 16.971) rotate(-45)">
          <path
            id="Path_3990"
            data-name="Path 3990"
            d="M0,0H24V24H0Z"
            fill="none"
          />
          <path
            id="Path_3991"
            data-name="Path 3991"
            d="M22,10V6a2.006,2.006,0,0,0-2-2H4A2,2,0,0,0,2.01,6v4A2,2,0,0,1,2,14v4a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V14a2,2,0,0,1,0-4ZM20,8.54a3.993,3.993,0,0,0,0,6.92V18H4V15.46A4.013,4.013,0,0,0,6,12,3.992,3.992,0,0,0,4.01,8.54L4,6H20ZM9.07,16,12,14.12,14.93,16l-.89-3.36,2.69-2.2-3.47-.21L12,7l-1.27,3.22-3.47.21,2.69,2.2Z"
            fill={this.props.color}
          />
        </g>
      </svg>
    );
  }
}

export default TicketIcon;
