import {
  Action,
  ProfileActionType,
  ProfileReducerType,
  MessageInterface,
  NotificationInterface,
  UserInterface
} from './../../interfaces';
import createReducer from './../createReducer';

const messages: MessageInterface[] = [
  {
    message: 'where is my shield!?',
    sendAt: new Date(),
    name: 'Fabrizio',
    username: 'fabrizio',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/fabrizio.jpg',
    read: true
  },
  {
    message: 'are you Rock!',
    sendAt: new Date('2020-04-01'),
    name: 'Eleonore',
    username: 'eleonore',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/eleonore.jpg',
    read: false
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-15'),
    name: 'chris',
    username: 'chris',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/chris.jpg',
    read: false
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-10'),
    name: 'Gabriela',
    username: 'gabriela',
    avatar:
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
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/harold.jpg',
    read: true,
    subject: 'Hello'
  },
  {
    message: 'are you Rock!',
    sendAt: new Date('2020-04-01'),
    name: 'Chris',
    username: 'chris',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/chris.jpg',
    read: false,
    subject: 'E-mail 1'
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-01'),
    name: 'Vigil',
    username: 'vigil365',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/fabrizio.jpg',
    read: false,
    subject: 'Email 1'
  }
];

const friends: UserInterface[] = [
  {
    name: 'Damiana',
    username: 'damiana',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/chris.jpg',
    isFriend: true,
    id: 1
  },
  {
    name: 'Dexter',
    username: 'dexter',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/dexter.jpg',
    id: 2
  },
  {
    name: 'Amanda',
    username: 'amanda',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/amanda.jpg',
    isFriend: true,
    id: 3
  },
  {
    name: 'Harold',
    username: 'harold',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/harold.jpg',
    isFriend: true,
    id: 4
  }
];
const admins: UserInterface[] = friends;
const artists: UserInterface[] = [
  {
    username: 'pharrell-williams',
    name: 'pharrell-williams',
    isFriend: true,
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_pharrell.jpg'
  },
  {
    username: 'rival-sons',
    name: 'rival-sons',
    isFriend: true,
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_rivalsons.jpg'
  }
];

const defaultState: ProfileReducerType = {
  messages: messages,
  notifications: notifications,
  notificationsSearch: notifications,
  messagesSearch: messages,
  friends: friends,
  friendsSearch: friends,
  artists: artists,
  artistsSearch: artists,
  admins: admins,
  adminsSearch: admins,
  friendsSelected: [],
  recentSelected: []
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
