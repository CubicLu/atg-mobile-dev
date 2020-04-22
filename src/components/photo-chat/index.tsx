import React from 'react';
import MinimizeIcon from '../icon/minimize';
import {
  PostComment,
  CloseIcon,
  InputText,
  Button,
  ButtonIcon
} from '../../components';
import { Colors, CommentInterface, Sizes } from '../../interfaces';
interface Props {
  displayChat: boolean;
  parentCallback?: Function;
  currentPostComments?: CommentInterface[];
}
export default class PhotoChatComponent extends React.Component<Props> {
  chatExpanded: boolean = false;
  expandChat(): void {
    this.chatExpanded = !this.chatExpanded;
    this.forceUpdate();
  }
  closeChatPanel = (shouldDisplay: boolean): void => {
    this.props.parentCallback && this.props.parentCallback(shouldDisplay, true);
  };
  renderHeader(): React.ReactNode {
    const chevron = this.chatExpanded ? 'chevron-reverse' : 'chevron-normal';
    return (
      <div className="mb-1 header px-1 flex">
        <div className={`align-start ${chevron}`}>
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
    );
  }
  renderComments(): React.ReactNode {
    const comments = this.props.currentPostComments;
    return (
      <div className="chat-section">
        {comments?.map(
          (data, i): React.ReactNode => (
            <PostComment comment={data} key={i} />
          )
        )}
      </div>
    );
  }
  renderPost(): React.ReactNode {
    return (
      <div className="comment-input fluid flex-align-items-center">
        <InputText
          size={Sizes.sm}
          className="f7 dark"
          type={'text'}
          placeholder={'Start a chat'}
        />
        <span className="mb-1">
          <Button label="Post" color={Colors.grayTransparent} bold={true} />
        </span>
      </div>
    );
  }
  render(): React.ReactNode {
    if (!this.props.displayChat) return null;

    const chatExpanded = this.chatExpanded ? 'chat-expanded' : '';
    return (
      <React.Fragment>
        <div className={`photo chat-component ${chatExpanded}`}>
          {this.renderHeader()}
          {this.renderComments()}
        </div>
        {this.renderPost()}
      </React.Fragment>
    );
  }
}
