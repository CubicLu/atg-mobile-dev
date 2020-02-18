import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string,
  width: number,
  height: number
};

class MessageIcon extends React.Component<Props> {
  public static defaultProps = {
    color: "#FFF",
    width: 32,
    height: 29
  };

  render(): React.ReactNode {
    return (
      <svg id="message" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
        <path id="Path_39734" data-name="Path 39734" d="M21.019,13.465,3.111,13.5A3.114,3.114,0,0,0,0,16.613V27.7a3.114,3.114,0,0,0,3.111,3.11H6.3v5.246a.525.525,0,0,0,.913.353l5.091-5.6,8.722-.036a3.114,3.114,0,0,0,3.111-3.11V16.576A3.114,3.114,0,0,0,21.019,13.465ZM5.246,18.711h6.82a.525.525,0,1,1,0,1.049H5.246a.525.525,0,0,1,0-1.049Zm13.639,7.344H5.246a.525.525,0,1,1,0-1.049H18.885a.525.525,0,0,1,0,1.049Zm0-3.148H5.246a.525.525,0,1,1,0-1.049H18.885a.525.525,0,0,1,0,1.049Z" transform="translate(0 -7.213)" fill={this.props.color} />
        <path id="Path_39735" data-name="Path 39735" d="M35.021,2.5,17.111,2.465A3.114,3.114,0,0,0,14,5.576V7.215l13.673-.028a4.166,4.166,0,0,1,4.163,4.16V23.532l1.71,1.881a.525.525,0,0,0,.913-.353V19.814h.561a3.114,3.114,0,0,0,3.111-3.11V5.613A3.114,3.114,0,0,0,35.021,2.5Z" transform="translate(-6.131 -2.465)" fill={this.props.color} />
      </svg>
    );
  }
}



export default MessageIcon;
