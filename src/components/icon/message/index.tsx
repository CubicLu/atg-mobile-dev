import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

export default class MessageIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 32,
    height: 32
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={'0 0 32 32'}
      >
        <g>
          <path
            fill={this.props.color}
            d="m20.706,8.326l-16.79,0.035a2.92,2.92 0 0 0 -2.916,2.916l0,10.4a2.919,2.919 0 0 0 2.916,2.916l2.984,0l0,4.918a0.492,0.492 0 0 0 0.856,0.331l4.772,-5.25l8.177,-0.033a2.919,2.919 0 0 0 2.916,-2.916l0,-10.4a2.92,2.92 0 0 0 -2.915,-2.917zm-14.788,4.918l6.393,0a0.492,0.492 0 1 1 0,0.984l-6.393,0a0.492,0.492 0 0 1 0,-0.984zm12.782,6.885l-12.782,0a0.492,0.492 0 0 1 0,-0.984l12.782,0a0.492,0.492 0 0 1 0,0.984zm0,-2.951l-12.782,0a0.492,0.492 0 0 1 0,-0.984l12.782,0a0.492,0.492 0 0 1 0,0.984z"
          />
          <path
            fill={this.props.color}
            d="m28.085,2.035l-16.792,-0.035a2.92,2.92 0 0 0 -2.916,2.916l0,1.537l12.818,-0.027a3.905,3.905 0 0 1 3.9,3.9l0,11.424l1.6,1.764a0.492,0.492 0 0 0 0.856,-0.331l0,-4.919l0.526,0a2.919,2.919 0 0 0 2.916,-2.916l0,-10.397a2.919,2.919 0 0 0 -2.908,-2.916z"
          />
        </g>
      </svg>
    );
  }
}
