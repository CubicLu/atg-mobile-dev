import { MessageInterface, NotificationInterface, UserInterface } from '../';

export interface ProfileReducerType {
  messages: MessageInterface[];
  notifications: NotificationInterface[];
  notificationsSearch: NotificationInterface[];
  messagesSearch: MessageInterface[];
  friends: UserInterface[];
  friendsSearch: UserInterface[];
  artists: UserInterface[];
  artistsSearch: UserInterface[];
  admins: UserInterface[];
  adminsSearch: UserInterface[];
  friendsSelected: number[];
  resentSelected: number[];
}
