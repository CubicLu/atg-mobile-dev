import React from 'react';
import {
  PostComment,
  CloseIcon,
  InputText,
  Button,
  ButtonIcon
} from '../../components';
import { Colors, CommentInterface } from '../../interfaces';
import MinimizeIcon from '../icon/minimize';
interface Props {
  displayChat: boolean;
  parentCallback?: Function;
  currentPostComments?: CommentInterface[];
}
class PhotoChatComponent extends React.Component<Props> {
  chatExpanded: boolean = false;
  closeChatPanel = (shouldDisplay: boolean): void => {
    if (this.props.parentCallback)
      this.props.parentCallback(shouldDisplay, true);
  };
  expandChat(): void {
    this.chatExpanded = !this.chatExpanded;
    this.forceUpdate();
  }
  render(): React.ReactNode {
    const chevronClass = this.chatExpanded
      ? 'chevron-reverse'
      : 'chevron-normal';
    const containerClass = this.chatExpanded ? 'chat-expanded' : '';
    return (
      <div>
        {this.props.displayChat && (
          <div
            style={{ maxHeight: 350, paddingBottom: 64 }}
            className={`photo-chat-component ${containerClass}`}
          >
            <div className="row close photo-chat-header">
              <div className="mx-2 flex-justify-content-end">
                <div className={`align-start ${chevronClass}`}>
                  <ButtonIcon
                    color={Colors.transparent}
                    icon={<MinimizeIcon />}
                    onClick={(): void => this.expandChat()}
                  />
                </div>
                <div className="align-end">
                  <ButtonIcon
                    color={Colors.transparent}
                    icon={<CloseIcon />}
                    onClick={(): void => this.closeChatPanel(false)}
                  />
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
