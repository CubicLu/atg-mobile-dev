import React from 'react';
import { Avatar } from '../../';
import { MessageInterface } from '../../../models';
import { ShapesSize } from '../../../types';
import moment from 'moment';

interface Props {
  user: MessageInterface;
  avatarSize?: number;
  showAvatar?: boolean;
  showDate?: boolean;
  colInfo?: number;
  colAvatar?: number;
  className?: string;
  dark: boolean;
  onClick?: Function;
}

class RowChatComponent extends React.Component<Props> {
  public static defaultProps = {
    avatarSize: 36,
    read: true,
    showAvatar: true,
    showDate: false,
    colInfo: 8,
    colAvatar: 2,
    dark: false,
    onClick: (): void => {}
  };
  render(): React.ReactNode {
    const { avatarSize, user, showDate, onClick } = this.props;
    const read = user.read ? '' : 'not-read';
    const grayUser = this.props.dark ? 'gray' : '';
    const darkText = this.props.dark ? 'dark' : '';
    return (
      <div
        className={`row my-1 mx-0 fluid flex-justify-content-end ${read}`}
        onClick={(): void => onClick && onClick()}
      >
        <div className="flex align-start">
          {this.props.showAvatar && (
            <Avatar
              width={avatarSize}
              height={avatarSize}
              type={ShapesSize.circle}
              image={user.image}
              avatarUrl={`/profile/${user.username}`}
            />
          )}
          <div className={'ml-1 flex-column'}>
            <span className={`f6 bold ${grayUser}`}>@{user.username}</span>
            <span className={`f5 ${darkText}`}>{user.message}</span>
          </div>
        </div>

        <div className="align-end f7 timestamp">
          {showDate && <span>{moment(user.sendAt).format('MM/DD/YY')}</span>}
        </div>
      </div>
    );
  }
}
export default RowChatComponent;
