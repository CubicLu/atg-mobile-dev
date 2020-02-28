/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType, ArtistReducerType } from './../../interfaces';
import createReducer from './../createReducer';
import {
  ArtistPharrellWilliamsImage,
  ArtistLmfaoImage,
  ArtistPharrellWilliamsBackgroundImage
} from './../../components';

const defaultState: ArtistReducerType = {
  artists: [
    {
      name: 'Pharrell Williams',
      cover: {
        main: ArtistPharrellWilliamsImage,
        background: ArtistPharrellWilliamsBackgroundImage
      },
      support: true,
      username: 'pharell-williams',
      backgroundGradient: {
        color1: '#079848',
        color2: '#079848'
      }
    },
    {
      name: 'LMFAO',
      cover: {
        main: ArtistLmfaoImage,
        background: ArtistLmfaoImage
      },
      support: false,
      username: 'lmfao',
      backgroundGradient: {
        color1: '#079848',
        color2: '#079848'
      }
    }
  ],
  currentArtist: null
};

export const artistReducer = createReducer<ArtistReducerType>(defaultState, {
  [ActionType.UPDATE_ARTIST_PROPERTY](
    state: ArtistReducerType,
    action: Action<any>
  ) {
    console.log(action.payload);
    return {
      ...state,
      [action.payload.property]: action.payload.value
    };
  }
});
