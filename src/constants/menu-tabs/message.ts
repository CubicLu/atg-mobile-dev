import { MenuInterface } from './../../models';
import { MessageChatPage, MessageNotificationsPage } from '../../pages';
export const messageTabs: MenuInterface[] = [
  {
    id: 'chat',
    label: 'Chat',
    icon: '',
    component: MessageChatPage
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '',
    component: MessageNotificationsPage
  }
];
