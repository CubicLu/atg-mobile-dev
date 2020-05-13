import React from 'react';
import moment from 'moment';

interface Props {
  date: Date;
  message: string;
  isReply: boolean;
}

class ChatBalloonComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { message, isReply, date } = this.props;
    let classname = isReply ? 'is-reply' : '';
    return (
      <div className={`chat-component--balloon ${classname}`}>
        <div className={`message ${classname} f6`}>{message}</div>
        <div className={'date f7'}>{moment(date).format('MM/DD/YYYY h:m')}</div>
      </div>
    );
  }
}

export default ChatBalloonComponent;
