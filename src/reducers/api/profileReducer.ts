import {
  Action,
  ProfileActionType,
  ProfileReducerType,
  MessageInterface,
  NotificationInterface
} from './../../models';
import createReducer from './../createReducer';

const messages: MessageInterface[] = [
  {
    message: 'where is my shield!?',
    sendAt: new Date(),
    name: 'Fabrizio',
    username: 'fabrizio',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/fabrizio.jpg',
    read: true
  },
  {
    message: 'are you Rock!',
    sendAt: new Date('2020-04-01'),
    name: 'Eleonore',
    username: 'eleonore',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/eleonore.jpg',
    read: false
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-15'),
    name: 'chris',
    username: 'chris',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/chris.jpg',
    read: false
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-10'),
    name: 'Gabriela',
    username: 'gabriela',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/gabriela.jpg',
    read: true
  }
];
const notifications: NotificationInterface[] = [
  {
    message: 'where is my shield!?',
    sendAt: new Date(),
    name: 'Harold',
    username: 'harold',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/harold.jpg',
    read: true,
    subject: 'Hello'
  },
  {
    message: 'are you Rock!',
    sendAt: new Date('2020-04-01'),
    name: 'Chris',
    username: 'chris',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/chris.jpg',
    read: false,
    subject: 'E-mail 1'
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-01'),
    name: 'Vigil',
    username: 'vigil365',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/fabrizio.jpg',
    read: false,
    subject: 'Email 1'
  }
];

const defaultState: ProfileReducerType = {
  messages: messages,
  notifications: notifications,
  notificationsSearch: notifications,
  messagesSearch: messages,
  friends: [],
  friendsSearch: [],
  artists: [],
  artistsSearch: [],
  admins: [],
  adminsSearch: [],
  friendsSelected: [],
  recentSelected: [],
  resentSelected: []
};

export const profileReducer = createReducer<ProfileReducerType>(defaultState, {
  [ProfileActionType.UPDATE_PROPERTY](
    state: ProfileReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      [action.payload.property]: action.payload.value
    };
  }
});
