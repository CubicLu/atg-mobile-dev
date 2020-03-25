import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class ChatMessageIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 16,
    height: 15
  };

  render(): React.ReactNode {
    return (
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 16 15.49"
      >
        <path
          id="Path_60569"
          data-name="Path 60569"
          d="M311.54,388.43l-11.87,0a2.08,2.08,0,0,0-2.07,2.09V398a2.08,2.08,0,0,0,2.07,2.09h2.11v3.51a.35.35,0,0,0,.22.33.34.34,0,0,0,.38-.09l3.38-3.75,5.78,0a2.08,2.08,0,0,0,2.06-2.09v-7.43A2.07,2.07,0,0,0,311.54,388.43Z"
          transform="translate(-297.6 -388.43)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default ChatMessageIcon;
