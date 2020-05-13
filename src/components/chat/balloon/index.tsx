import React from 'react';
import moment from 'moment';
import { Avatar } from '../..';
import { ShapesSize } from '../../../types';

interface Props {
  date: Date;
  message: string;
  isReply: boolean;
  avatar?: string;
}

class ChatBalloonComponent extends React.Component<Props> {
  renderAvatar(): React.ReactNode {
    const { avatar } = this.props;
    return (
      <Avatar image={avatar} type={ShapesSize.circle} width={32} height={32} />
    );
  }
  render(): React.ReactNode {
    const { message, isReply, date, avatar } = this.props;
    let classname = isReply ? 'is-reply' : '';
    return (
      <div className={`chat-component--balloon ${classname}`}>
        {avatar && !isReply && this.renderAvatar()}
        <div className="data">
          <div className={`message ${classname} f6`}>{message}</div>
          <div className={'date f7'}>
            {moment(date).format('MM/DD/YYYY h:m')}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBalloonComponent;
