import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class NextIcon extends React.Component<Props> {
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
          id="Next"
          d="M-2015.2-864.909l-9.8,6.5V-872l9.8,6.564V-872l10.2,6.829-10.2,6.76Z"
          transform="translate(2025 872)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default NextIcon;
