import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class MessageBalloonIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 24,
    height: 23
  };

  render(): React.ReactNode {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
        <path id="Path_60538" data-name="Path 60538" d="M21.019,13.465,3.111,13.5A3.114,3.114,0,0,0,0,16.613V27.7a3.114,3.114,0,0,0,3.111,3.11H6.3v5.246a.525.525,0,0,0,.913.353l5.091-5.6,8.722-.036a3.114,3.114,0,0,0,3.111-3.11V16.576A3.114,3.114,0,0,0,21.019,13.465ZM5.246,18.711h6.82a.525.525,0,1,1,0,1.049H5.246a.525.525,0,0,1,0-1.049Zm13.639,7.344H5.246a.525.525,0,1,1,0-1.049H18.885a.525.525,0,0,1,0,1.049Zm0-3.148H5.246a.525.525,0,1,1,0-1.049H18.885a.525.525,0,0,1,0,1.049Z" transform="translate(0 -13.465)" fill={this.props.color} />
      </svg>    
    );
  }
}

export default MessageBalloonIcon;
