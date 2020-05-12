import React from 'react';
import { Avatar } from '../../';
import { MessageInterface } from '../../../models';
import { ShapesSize } from '../../../types';
import moment from 'moment';

interface Props {
  data: MessageInterface;
  avatarSize?: number;
  showAvatar?: boolean;
  showDate?: boolean;
  colInfo?: number;
  colAvatar?: number;
  className?: string;
  dark: boolean;
}

class RowChatComponent extends React.Component<Props> {
  public static defaultProps = {
    avatarSize: 36,
    read: true,
    showAvatar: true,
    showDate: false,
    colInfo: 8,
    colAvatar: 2,
    dark: false
  };
  render(): React.ReactNode {
    const { avatarSize, data, showDate } = this.props;
    const read = data.read ? '' : 'not-read';
    const grayUser = this.props.dark ? 'gray' : '';
    const darkText = this.props.dark ? 'dark' : '';
    return (
      <div className={`row my-1 mx-0 fluid flex-justify-content-end ${read}`}>
        <div className="flex align-start">
          {this.props.showAvatar && (
            <Avatar
              width={avatarSize}
              height={avatarSize}
              type={ShapesSize.circle}
              image={data.avatar}
            />
          )}
          <div className={'ml-1 flex-column'}>
            <span className={`f6 bold ${grayUser}`}>@{data.username}</span>
            <span className={`f5 ${darkText}`}>{data.message}</span>
          </div>
        </div>

        <div className="align-end f7 timestamp">
          {showDate && <span>{moment(data.sendAt).format('MM/DD/YY')}</span>}
        </div>
      </div>
    );
  }
}
export default RowChatComponent;
