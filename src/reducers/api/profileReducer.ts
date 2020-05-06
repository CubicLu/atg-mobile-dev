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
    name: 'Steve',
    username: 'steverogers',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: true
  },
  {
    message: 'are you Rock!',
    sendAt: new Date('2020-04-01'),
    name: 'Débora',
    username: 'debora',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-15'),
    name: 'Vigil',
    username: 'vigil365',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-10'),
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
    sendAt: new Date('2020-04-01'),
    name: 'Débora',
    username: 'debora',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false,
    subject: 'E-mail 1'
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-03-01'),
    name: 'Vigil',
    username: 'vigil365',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false,
    subject: 'Email 1'
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-02-21'),
    name: 'Bruce',
    username: 'brucebanner',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: true,
    subject: 'subject here'
  },
  {
    message: 'Good!',
    sendAt: new Date('2020-01-31'),
    name: 'Vigil',
    username: 'vigil365',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: false,
    subject: 'E-mail 2'
  },
  {
    message: 'Good!',
    sendAt: new Date('2019-04-01'),
    name: 'Bruce',
    username: 'brucebanner',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    read: true,
    subject: 'E-mail 3'
  }
];

const friends: UserInterface[] = [
  {
    name: 'Débora',
    username: 'debora',
    avatar: 'https://loremflickr.com/50/50/woman,face?random=' + Math.random(),
    isFriend: true,
    id: 1
  },
  {
    name: 'vigil',
    username: 'vigil',
    avatar: 'https://loremflickr.com/50/50/man,face?random=' + Math.random(),
    id: 2
  },
  {
    name: 'Bruce',
    username: 'brucebanner',
    avatar: 'https://loremflickr.com/50/50/hulk?random=' + Math.random(),
    isFriend: true,
    id: 3
  },
  {
    name: 'Steve',
    username: 'steverogers',
    avatar:
      'https://loremflickr.com/50/50/steve,rogers?random=' + Math.random(),
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
      'https://loremflickr.com/50/50/pharrell,williams?random=' + Math.random()
  },
  {
    username: 'demi',
    name: 'demi',
    isFriend: true,
    avatar: 'https://loremflickr.com/50/50/demi,lovato?random=' + Math.random()
  },
  {
    username: 'milie-cyrus',
    name: 'pharrell-williams',
    isFriend: true,
    avatar: 'https://loremflickr.com/50/50/cyrus?random=' + Math.random()
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
