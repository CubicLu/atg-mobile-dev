import React from 'react';

import {
  PostComment,
  CloseIcon,
  InputText,
  Button,
  ButtonIcon
} from '../../components';
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
          <div
            style={{ maxHeight: 350, paddingBottom: 64 }}
            className={'photo-chat-component'}
          >
            <div className="row close photo-chat-header">
              <div className="col s12 flex-justify-content-end">
                <ButtonIcon
                  color={Colors.transparent}
                  icon={<CloseIcon />}
                  onClick={this.closeChatPanel.bind(this, false)}
                />
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
