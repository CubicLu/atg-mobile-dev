import React from 'react';

import InputTextComponent from '../input/text';
import { PostComment } from '../../components';
interface Props {
  displayChat: boolean;
  parentCallback?: Function;
}
class PhotoChatComponent extends React.Component<Props> {
  closeChatPanel = (shouldDisplay: boolean): void => {
    if (this.props.parentCallback)
      this.props.parentCallback(shouldDisplay, true);
  };

  render(): React.ReactNode {
    const currentPostComments = [
      {
        user: { username: '@Victor', name: 'Victor' },
        text: 'aeeee'
      },
      {
        user: { username: '@Victor', name: 'Victor' },
        text: 'aeeee'
      },
      {
        user: { username: '@Victor', name: 'Victor' },
        text: 'aeeee'
      },
      {
        user: { username: '@Victor', name: 'Victor' },
        text: 'aeeee'
      },
      {
        user: { username: '@Victor', name: 'Victor' },
        text: 'aeeee'
      },
      {
        user: { username: '@Victor', name: 'Victor' },
        text: 'aeeee'
      }
    ];
    return (
      <div>
        {this.props.displayChat && (
          <div style={{ height: 350, paddingBottom: 50 }}>
            <div className="row photo-chat-header">
              <div className="col s10" />
              <div className="col s2">
                <div onClick={this.closeChatPanel.bind(this, false)}>
                  <img src={'../assets/close.svg'} alt={'Close'} />
                </div>
              </div>
            </div>
            <div className="row" style={{ height: 170, overflowY: 'scroll' }}>
              {!!currentPostComments &&
                currentPostComments.map(
                  (data, i): React.ReactNode => {
                    return <PostComment comment={data} key={i} />;
                  }
                )}
            </div>
            <InputTextComponent type={'text'} placeholder={'Start a Chat'} />
          </div>
        )}
      </div>
    );
  }
}

export default PhotoChatComponent;
