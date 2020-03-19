import {
  ActionType,
  PlayerReducerType,
  PlaylistInterface,
  SongInterface
} from './../interfaces';
import createReducer from './createReducer';

const futureSongs: SongInterface[] = [
  {
    id: '0VgkVdmE4gld66l8iyGjgx',
    artist: 'Future',
    name: 'Mask Off',
    trackNumber: 7,
    duration: 204.6,
    cover: 'https://i.scdn.co/image/ab67616d0000b273e0b64c8be3c4e804abcb2696',
    url:
      'https://p.scdn.co/mp3-preview/0519fc7c44d418ca6c721d9aa83e9597065288e1?cid=230be2f46909426b8b80cac36446b52a',
    album: 'FUTURE'
  },
  {
    id: '5yY9lUy8nbvjM1Uyo1Uqoc',
    artist: 'Future',
    name: 'Life Is Good (feat. Drake)',
    trackNumber: 1,
    duration: 237.735,
    cover: 'https://i.scdn.co/image/ab67616d0000b2738a01c7b77a34378a62f46402',
    url:
      'https://p.scdn.co/mp3-preview/79199a9ab949b5803197efb455c224299d7d5949?cid=230be2f46909426b8b80cac36446b52a',
    album: 'Life Is Good (feat. Drake)'
  },
  {
    id: '5274I4mUMnYczyeXkGDWZN',
    artist: 'Future',
    name: 'Fine China',
    trackNumber: 3,
    duration: 141.586,
    cover: 'https://i.scdn.co/image/ab67616d0000b273644c510e8d4c02ae69028297',
    url:
      'https://p.scdn.co/mp3-preview/c068b4ce494bfd5db193c38d4e911296de3b43fc?cid=230be2f46909426b8b80cac36446b52a',
    album: 'Future & Juice WRLD Present... WRLD ON DRUGS'
  }
];
const euroSongs: SongInterface[] = [
  {
    id: '21WTCDU55iW0z2kzXq9R8B',
    artist: 'Fivio Foreign',
    name: 'Big Drip (feat. Lil Baby & Quavo) - Remix',
    trackNumber: 1,
    duration: 233.143,
    cover: 'https://i.scdn.co/image/ab67616d0000b273636b1687750248687c0be335',
    url:
      'https://p.scdn.co/mp3-preview/03c8eea54cc86a7ed4c17492bc97c12b70e867e1?cid=230be2f46909426b8b80cac36446b52a',
    album: 'Big Drip (feat. Lil Baby & Quavo) [Remix]'
  },
  {
    id: '5R9k9x85lAYbamdUoKAJvj',
    artist: 'Pop Smoke',
    name: 'Dior (with Gunna) - Remix',
    trackNumber: 15,
    duration: 230.386,
    cover: 'https://i.scdn.co/image/ab67616d0000b273cd90e898c070ef21812ab363',
    url:
      'https://p.scdn.co/mp3-preview/9fa6858800a18cb2f79c862bb326dbc44c848d83?cid=230be2f46909426b8b80cac36446b52a',
    album: 'Meet The Woo 2 (Deluxe)'
  },
  {
    id: '0nbXyq5TXYPCO7pr3N8S4I',
    artist: 'Roddy Ricch',
    name: 'The Box',
    trackNumber: 2,
    duration: 196.652,
    cover: 'https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f',
    url:
      'https://p.scdn.co/mp3-preview/52c74a85b9b187b8f51bfe1c7b19a25f7624161a?cid=230be2f46909426b8b80cac36446b52a',
    album: 'Please Excuse Me For Being Antisocial'
  },
  {
    id: '4iiWcajF1fEUpwcUewc464',
    artist: 'Future',
    name: 'Life Is Good (feat. Drake, DaBaby & Lil Baby) - Remix',
    trackNumber: 1,
    duration: 315.346,
    cover: 'https://i.scdn.co/image/ab67616d0000b2734df9c60aa74fb72c1e07fd1d',
    url:
      'https://p.scdn.co/mp3-preview/0ec243b93a219d369ed34082eccf1146edc2f50c?cid=230be2f46909426b8b80cac36446b52a',
    album: 'Life Is Good (feat. Drake, DaBaby & Lil Baby) [Remix]'
  },
  {
    id: '3Q6F8RByyhRTJpRtZLY3cg',
    artist: 'Jack Harlow',
    name: 'WHATS POPPIN',
    trackNumber: 1,
    duration: 139.741,
    cover: 'https://i.scdn.co/image/ab67616d0000b27305c50cf7a461aa654fe9b15a',
    url:
      'https://p.scdn.co/mp3-preview/0ec243b93a219d369ed34082eccf1146edc2f50c?cid=230be2f46909426b8b80cac36446b52a',
    album: 'WHATS POPPIN'
  },
  {
    id: '7KSSdFCBHCfq4KPzz78ghk',
    artist: 'Lil Baby',
    name: 'Heatin Up (feat. Gunna)',
    trackNumber: 2,
    duration: 177.314,
    cover: 'https://i.scdn.co/image/ab67616d0000b273f46a9ad551acbdab8f72fd89',
    url:
      'https://p.scdn.co/mp3-preview/c068b4ce494bfd5db193c38d4e911296de3b43fc?cid=230be2f46909426b8b80cac36446b52a',
    album: 'My Turn'
  },
  {
    id: '1HF6P40Z7nfExGaB1Gk99v',
    artist: 'Lil Uzi Vert',
    name: 'Got The Guap (feat. Young Thug)',
    trackNumber: 13,
    duration: 176.756,
    cover: 'https://i.scdn.co/image/ab67616d0000b273a4865bd4e21a153d4d7f72f0',
    url:
      'https://p.scdn.co/mp3-preview/9fa6858800a18cb2f79c862bb326dbc44c848d83?cid=230be2f46909426b8b80cac36446b52a',
    album: 'Eternal Atake (Deluxe) - LUV vs. The World 2'
  },
  {
    id: '7EiZI6JVHllARrX9PUvAdX',
    artist: 'Future',
    name: 'Low Life',
    trackNumber: 10,
    duration: 313.546,
    cover: 'https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad',
    url:
      'https://p.scdn.co/mp3-preview/dd493a2d827e0d6b40470f23913f301aee963157?cid=230be2f46909426b8b80cac36446b52a',
    album: 'EVOL'
  }
];
const euroPlaylist: PlaylistInterface = {
  name: 'Euro House',
  id: 1,
  source: 'radio',
  sourceId: 2,
  cover: '/static/media/euro-house.1cefc333.png',
  owner: 'Bono Vox',
  items: euroSongs
};
const futurePlaylist: PlaylistInterface = {
  name: 'Future Radio',
  id: 1,
  source: 'mixtape',
  sourceId: 21,
  cover: 'https://i.scdn.co/image/ab67616d0000b273e0b64c8be3c4e804abcb2696',
  owner: 'Future',
  items: futureSongs
};
const defaultState: PlayerReducerType = {
  expanded: false,
  playing: false,
  paused: false,
  timeElapsed: 0,
  canSkip: true,
  shuffle: false,
  repeat: false
};

export const playerReducer = createReducer<PlayerReducerType>(defaultState, {
  [ActionType.SET_PLAYLIST_PLAYER](state: PlayerReducerType): any {
    return {
      ...state,
      song: null,
      playlist: futurePlaylist,
      playListIndex: 0
    };
  },
  [ActionType.SET_RADIO_PLAYER](state: PlayerReducerType): any {
    return {
      ...state,
      song: null,
      playlist: euroPlaylist,
      playListIndex: 0
    };
  },
  [ActionType.TOGGLE_SHUFFLE_PLAYER](state: PlayerReducerType): any {
    return { ...state, repeat: !state.repeat };
  },
  [ActionType.TOGGLE_REPEAT_PLAYER](state: PlayerReducerType): any {
    return { ...state, repeat: !state.repeat };
  },
  [ActionType.TOGGLE_PLAYER](state: PlayerReducerType): any {
    return { ...state, expanded: !state.expanded };
  },
  [ActionType.PLAY_SONG](state: PlayerReducerType, action: any): any {
    return { ...state, song: action.song, playing: true, paused: false };
  },
  [ActionType.PAUSE_SONG](state: PlayerReducerType): any {
    return { ...state, playing: false, paused: true };
  },
  [ActionType.STOP_SONG](state: PlayerReducerType): any {
    return {
      ...state,
      playing: false,
      paused: false,
      song: null,
      expanded: false
    };
  },
  [ActionType.UPDATE_ELAPSED_SONG](state: PlayerReducerType, action: any): any {
    return { ...state, timeElapsed: action.timeElapsed };
  }
});
