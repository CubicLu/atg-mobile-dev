import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class ShareLineIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 20,
    height: 16
  };

  render(): React.ReactNode {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 20 16"
      >
        <path
          d="M11.8,12.46l7.36-5.58L11.79,1.3V4.94C.55,4.94.94,16.18.94,16.18s.53-7.36,10.85-7.36Z"
          fill={'none'}
          stroke={this.props.color}
          strokeLinecap={'round'}
          strokeMiterlimit={10}
        />
      </svg>
    );
  }
}

export default ShareLineIcon;
