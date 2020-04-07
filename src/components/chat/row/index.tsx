import React from 'react';
import { Avatar } from '../../';
import { ShapesSize, MessageInterface } from '../../../interfaces';
import moment from 'moment';

interface Props {
  data: MessageInterface;
  avatarSize?: number;
  showAvatar?: boolean;
  showDate?: boolean;
  colInfo?: number;
  colAvatar?: number;
}

class ChatRowComponent extends React.Component<Props> {
  public static defaultProps = {
    avatarSize: 36,
    read: true,
    showAvatar: true,
    showDate: false,
    colInfo: 8,
    colAvatar: 2
  };
  render(): React.ReactNode {
    const { avatarSize, data, showDate, colInfo, colAvatar } = this.props;
    return (
      <div
        className={`row w-100 chat-row-component ${
          data.read ? '' : 'not-read'
        }`}
      >
        {this.props.showAvatar && (
          <div className={`col s${colAvatar} flex-justify-content-end`}>
            <Avatar
              width={avatarSize}
              height={avatarSize}
              type={ShapesSize.circle}
              image={data.avatar}
            />
          </div>
        )}
        <div className={`col s${colInfo} info`}>
          <span
            className="text-14"
            data-date={showDate ? moment(data.sendAt).format('MM/DD/YY') : ''}
          >
            {data.username}
          </span>
          <span className="text-16">{data.message}</span>
        </div>
      </div>
    );
  }
}
export default ChatRowComponent;
