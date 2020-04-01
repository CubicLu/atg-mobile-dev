import React from 'react';

import { PostComment, CloseIcon, InputText, Button } from '../../components';
import { Colors, CommentInterface } from '../../interfaces';
interface Props {
  displayChat: boolean;
  parentCallback?: Function;
  currentPostComments?: CommentInterface[];
}
class PhotoChatComponent extends React.Component<Props> {
  closeChatPanel = (shouldDisplay: boolean): void => {
    if (this.props.parentCallback)
      this.props.parentCallback(shouldDisplay, true);
  };

  render(): React.ReactNode {
    return (
      <div>
        {this.props.displayChat && (
          <div style={{ maxHeight: 350, paddingBottom: 64 }}>
            <div className="row photo-chat-header">
              <div className="col s10" />
              <div className="col">
                <div onClick={this.closeChatPanel.bind(this, false)}>
                  <CloseIcon width={24} height={24} />
                </div>
              </div>
            </div>
            <div className="row chat-section">
              {this.props.currentPostComments &&
                this.props.currentPostComments.map(
                  (data, i): React.ReactNode => {
                    return <PostComment comment={data} key={i} />;
                  }
                )}
            </div>
            <div className="chat-input">
              <InputText type={'text'} placeholder={'Start a chat'} />
              <Button label="Post" color={Colors.grayTransparent} bold={true} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PhotoChatComponent;
