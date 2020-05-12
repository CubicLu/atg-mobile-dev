import { MessageInterface, NotificationInterface, UserInterface } from '../';

export interface ProfileReducerType {
  readonly messages: MessageInterface[];
  readonly notifications: NotificationInterface[];
  readonly notificationsSearch: NotificationInterface[];
  readonly messagesSearch: MessageInterface[];
  readonly friends: UserInterface[];
  readonly friendsSearch: UserInterface[];
  readonly artists: UserInterface[];
  readonly artistsSearch: UserInterface[];
  readonly admins: UserInterface[];
  readonly adminsSearch: UserInterface[];
  readonly friendsSelected: number[];
  readonly resentSelected: number[];
  readonly recentSelected: number[];
}
