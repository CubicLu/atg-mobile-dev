/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType, ArtistReducerType } from './../../interfaces';
import createReducer from './../createReducer';
import {
  ArtistPharrellWilliamsImage,
  ArtistLmfaoImage,
  ArtistPharrellWilliamsBackgroundImage,
  ArtistPharrellWilliamsAlbumNumberOneImage,
  ArtistPharrellWilliamsAlbumFreedomImage,
  ArtistPharrellWilliamsAlbumFrontinImage,
  ArtistPharrellWilliamsAlbumMyGirlImage,
  ArtistPharrellWilliamsAlbumTheNeptunesImage,
  ArtistPharrellWilliamsAlbumHappyImage,
  GenersRebImage,
  GenersHipHopImage,
  GenersSoulImage,
  ArtistPharrellWilliamsPlaylistImage,
  ArtistPharrellWilliamsNewRelease1Image,
  ArtistPharrellWilliamsNewRelease2Image,
  ArtistPharrellWilliamsSupportBackgroundImage,
  ArtistPharrellWilliamsSupportAvatarImage,
  ArtistPharrellWilliamsEventBackgroundImage,
  ArtistRobinThickeImage,
  ArtistBonoVoxImage,
  ArtistMickJaggerImage
} from './../../components';

const defaultState: ArtistReducerType = {
  artists: [
    {
      name: 'Pharrell Williams',
      cover: {
        main: ArtistPharrellWilliamsImage,
        background: ArtistPharrellWilliamsBackgroundImage,
        event: ArtistPharrellWilliamsEventBackgroundImage
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
          song: 'Marilyn Monroe',
          id: 1
        },
        {
          song: 'Brand New',
          id: 2
        },
        {
          song: 'Hunter',
          id: 3
        }
      ],
      newReleases: [
        {
          image: ArtistPharrellWilliamsNewRelease1Image,
          video: ArtistPharrellWilliamsNewRelease1Image,
          artist: {
            name: 'H.E.R',
            cover: ArtistPharrellWilliamsNewRelease1Image,
            username: 'her'
          },
          title: 'Oscar Moments',
          time: '8:00'
        },
        {
          image: ArtistPharrellWilliamsNewRelease2Image,
          video: ArtistPharrellWilliamsNewRelease2Image,
          artist: {
            name: 'Lizzo',
            cover: ArtistPharrellWilliamsNewRelease2Image,
            username: 'lizzo'
          },
          title: 'Grammy',
          time: '30:45'
        }
      ],
      radio: [
        {
          label: 'Pharrel Williams',
          image: ArtistPharrellWilliamsPlaylistImage
        },
        {
          label: 'R&B',
          image: GenersRebImage
        },
        {
          label: 'Hip Hop',
          image: GenersHipHopImage
        },
        {
          label: 'Soul',
          image: GenersSoulImage
        }
      ],
      events: [
        {
          date: '2020-02-21',
          name: 'The Happy Tour',
          where: 'Microsoft Theatre',
          city: 'Los Angeles, CA'
        },
        {
          date: '2020-02-21',
          name: 'The Happy Tour',
          where: 'Microsoft Theatre',
          city: 'Los Angeles, CA'
        },
        {
          date: '2020-02-21',
          name: 'The Happy Tour',
          where: 'Microsoft Theatre',
          city: 'Los Angeles, CA'
        },
        {
          date: '2020-02-21',
          name: 'The Happy Tour',
          where: 'Microsoft Theatre',
          city: 'Los Angeles, CA'
        }
      ],
      discography: [
        {
          name: 'Happy',
          cover: ArtistPharrellWilliamsAlbumHappyImage
        },
        {
          name: 'Freedom',
          cover: ArtistPharrellWilliamsAlbumFreedomImage
        },
        {
          name: 'My Girl',
          cover: ArtistPharrellWilliamsAlbumMyGirlImage
        },
        {
          name: 'Frontin',
          cover: ArtistPharrellWilliamsAlbumFrontinImage
        },
        {
          name: 'The Neptunes',
          cover: ArtistPharrellWilliamsAlbumTheNeptunesImage
        },
        {
          name: 'Number One',
          cover: ArtistPharrellWilliamsAlbumNumberOneImage
        }
      ],
      supportArtistFans: [
        {
          cover: ArtistRobinThickeImage,
          name: 'Robin Thicke',
          username: 'robin-thicke'
        },
        { cover: ArtistBonoVoxImage, name: 'Bono Vox', username: 'bono-vox' },
        {
          cover: ArtistMickJaggerImage,
          name: 'Mick Jagger',
          username: 'mick-jagger'
        }
      ]
    },
    {
      name: 'LMFAO',
      cover: {
        main: ArtistLmfaoImage,
        background: ArtistLmfaoImage,
        event: ArtistLmfaoImage
      },
      support: false,
      username: 'lmfao',
      backgroundGradient: {
        color1: '#079848',
        color2: '#079848'
      }
    },
    {
      name: 'Bono Vox',
      cover: {
        main: ArtistBonoVoxImage,
        background: ArtistBonoVoxImage,
        event: ArtistBonoVoxImage
      },
      support: false,
      username: 'bono-vox',
      backgroundGradient: {
        color1: '#bb3821',
        color2: '#501005'
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
