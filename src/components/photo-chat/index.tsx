import React from 'react';
import {
  PostComment,
  CloseIcon,
  ButtonIcon,
  MinimizeIcon,
  InputChat
} from '../../components';
import { CommentInterface } from '../../models';
import { Colors } from '../../types';
interface Props {
  displayChat: boolean;
  parentCallback?: Function;
  currentPostComments?: CommentInterface[];
  className?: string;
}
interface State {
  chatExpanded: boolean;
}
export default class PhotoChatComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      chatExpanded: false
    };
  }
  expandChat(): void {
    this.setState({
      chatExpanded: !this.state.chatExpanded
    });
  }
  closeChatPanel = (shouldDisplay: boolean): void => {
    this.props.parentCallback && this.props.parentCallback(shouldDisplay, true);
  };
  renderHeader(): React.ReactNode {
    const chevron = this.state.chatExpanded
      ? 'chevron-reverse'
      : 'chevron-normal';
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
    return <InputChat label={'Post'} placeholder={'Start a chat'} />;
  }
  render(): React.ReactNode {
    if (!this.props.displayChat) return null;

    const chatExpanded = this.state.chatExpanded ? 'chat-expanded' : '';
    return (
      <React.Fragment>
        <div
          className={`photo chat-component ${chatExpanded} ${this.props
            .className ?? ''}`}
        >
          {this.renderHeader()}
          {this.renderComments()}
        </div>
        {this.renderPost()}
      </React.Fragment>
    );
  }
}
