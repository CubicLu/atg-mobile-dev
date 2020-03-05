/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType, ArtistReducerType } from './../../interfaces';
import createReducer from './../createReducer';
import {
  ArtistPharrellWilliamsImage,
  ArtistLmfaoImage,
  ArtistPharrellWilliamsBackgroundImage,
  ArtistPharrellWilliamsSupportBackgroundImage,
  ArtistPharrellWilliamsSupportAvatarImage
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
      supportImages: {
        background: ArtistPharrellWilliamsSupportBackgroundImage,
        avatar: ArtistPharrellWilliamsSupportAvatarImage
      },
      username: 'pharell-williams',
      backgroundGradient: {
        color1: '#079848',
        color2: '#136137'
      },
      featuredTracks: [
        {
          image: ArtistPharrellWilliamsImage
        },
        {
          image: ArtistPharrellWilliamsImage
        }
      ],
      newReleases: [
        {
          image: ArtistPharrellWilliamsImage,
          video: ArtistPharrellWilliamsImage,
          artist: {
            name: 'H.E.R',
            cover: ArtistPharrellWilliamsImage,
            username: 'her'
          },
          title: 'Oscar Moments',
          time: '8:00'
        },
        {
          image: ArtistPharrellWilliamsImage,
          video: ArtistPharrellWilliamsImage,
          artist: {
            name: 'Lizzo',
            cover: ArtistPharrellWilliamsImage,
            username: 'lizzo'
          },
          title: 'Grammy',
          time: '30:45'
        }
      ],
      radio: [
        {
          label: 'Pharrel Williams',
          image: ArtistPharrellWilliamsImage
        },
        {
          label: 'R&B',
          image: ArtistPharrellWilliamsImage
        },
        {
          label: 'Hip Hop',
          image: ArtistPharrellWilliamsImage
        },
        {
          label: 'Soul',
          image: ArtistPharrellWilliamsImage
        }
      ],
      events: [
        {
          date: '2020-02-21',
          name: 'The Happy Tour',
          where: 'Microsoft Theatre',
          city: 'Los Angeles, CA'
        }
      ]
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
    return {
      ...state,
      [action.payload.property]: action.payload.value
    };
  }
});
