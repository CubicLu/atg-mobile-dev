import React from 'react';

interface Props {
  width: number;
  height: number;
  opacity: number;
  color: string;
}

export default class EditIcon extends React.Component<Props> {
  public static defaultProps = {
    width: 32,
    height: 32,
    opacity: 0.5,
    color: '#fff'
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 36 36"
      >
        <circle cx="18" cy="18" r="18" opacity={this.props.opacity} />
        <g transform="translate(8 8)">
          <path
            d="M3 15.84v3.38h3.379l9.966-9.966-3.379-3.38zm15.959-9.2a.9.9 0 0 0 0-1.271L16.85 3.261a.9.9 0 0 0-1.271 0L13.93 4.91l3.38 3.379 1.649-1.649z"
            transform="translate(-1.222 -1.221)"
            fill={this.props.color}
          />
          <path d="M0 0h10.667v10.667H0z" fill="none" />
        </g>
      </svg>
    );
  }
}
