import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class ShareIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 22,
    height: 24
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 17 24"
      >
        <path
          d="M27.908,26.533v1.33H33.4v14.7h-14.7v-14.7h5.49v-1.33h-6.82V43.9H34.728V26.533Z"
          transform="translate(-17.363 -21)"
          fill={this.props.color}
        />
        <path
          d="M35.829,6.082V18.575h1.3V6.082L40.533,8.51l.847-1.188-4.9-3.494-4.9,3.494.847,1.188Z"
          transform="translate(-27.796 -4.5)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default ShareIcon;
