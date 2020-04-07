import {
  Action,
  ActionType,
  ProfileReducerType,
  MessageInterface,
  NotificationInterface
} from './../../interfaces';
import createReducer from './../createReducer';

const messages: MessageInterface[] = [
  {
    message: 'where is my shield!?',
    sendAt: new Date(),
    name: 'Steve',
    username: 'steverogers',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: true
  },
  {
    message: 'are you Rock!',
    sendAt: new Date(),
    name: 'Débora',
    username: 'debora',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false
  },
  {
    message: 'Good!',
    sendAt: new Date(),
    name: 'Vigil',
    username: 'vigil365',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false
  },
  {
    message: 'Good!',
    sendAt: new Date(),
    name: 'Bruce',
    username: 'brucebanner',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: true
  }
];
const notifications: NotificationInterface[] = [
  {
    message: 'where is my shield!?',
    sendAt: new Date(),
    name: 'Steve',
    username: 'steverogers',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: true,
    subject: 'Hello'
  },
  {
    message: 'are you Rock!',
    sendAt: new Date(),
    name: 'Débora',
    username: 'debora',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false,
    subject: 'E-mail 1'
  },
  {
    message: 'Good!',
    sendAt: new Date(),
    name: 'Vigil',
    username: 'vigil365',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false,
    subject: 'Email 1'
  },
  {
    message: 'Good!',
    sendAt: new Date(),
    name: 'Bruce',
    username: 'brucebanner',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: true,
    subject: 'subject here'
  },
  {
    message: 'Good!',
    sendAt: new Date(),
    name: 'Vigil',
    username: 'vigil365',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false,
    subject: 'E-mail 2'
  },
  {
    message: 'Good!',
    sendAt: new Date(),
    name: 'Bruce',
    username: 'brucebanner',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: true,
    subject: 'E-mail 3'
  }
];

const defaultState: ProfileReducerType = {
  messages: messages,
  notifications: notifications,
  notificationsSearch: notifications,
  messagesSearch: messages
};

export const profileReducer = createReducer<ProfileReducerType>(defaultState, {
  [ActionType.UPDATE_PROFILE_PROPERTY](
    state: ProfileReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      [action.payload.property]: action.payload.value
    };
  }
});
