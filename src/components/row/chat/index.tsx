import React from 'react';
import { Avatar } from '../../';
import { MessageInterface } from '../../../models';
import { ShapesSize } from '../../../types';
import moment from 'moment';
import { IonRouterLink } from '@ionic/react';

interface Props {
  user: MessageInterface;
  avatarSize?: number;
  showAvatar?: boolean;
  showDate?: boolean;
  colInfo?: number;
  colAvatar?: number;
  className?: string;
  routerLink?: string;
  dark: boolean;
}

export default class RowChatComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
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
    const { avatarSize, user, showDate } = this.props;
    const read = user.read ? '' : 'not-read';
    const grayUser = this.props.dark ? 'gray' : '';
    const darkText = this.props.dark ? 'dark' : '';
    return (
      <div className={`row my-1 mx-0 fluid flex-justify-content-end ${read}`}>
        <div className="flex align-start fluid">
          {this.props.showAvatar && (
            <Avatar
              width={avatarSize}
              height={avatarSize}
              type={ShapesSize.circle}
              image={user.image}
              avatarUrl={`/profile/friend/${user.username}`}
            />
          )}
          <div
            onClick={(): void => this.linkRef.current?.click()}
            className={'ml-1 flex-column'}
          >
            <span className={`f6 bold ${grayUser}`}>@{user.username}</span>
            <span className={`f5 ${darkText}`}>{user.message}</span>
          </div>
        </div>
        <IonRouterLink ref={this.linkRef} routerLink={this.props.routerLink} />

        <div className="align-end f7 timestamp">
          {showDate && <span>{moment(user.sendAt).format('MM/DD/YY')}</span>}
        </div>
      </div>
    );
  }
}
