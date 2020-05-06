import { Action, RadioActionType, RadioReducerType } from '../../interfaces';
import createReducer from '../createReducer';

const defaultState: RadioReducerType = {
  radioArtist: {
    id: '',
    type: 'Artist',
    name: '',
    icon: '',
    image: '',
    title: '',
    subtitle: '',
    color: '',
    target: '',
    tags: []
  },
  loading: false,
  errorMessage: null
};

export const radioReducer = createReducer<RadioReducerType>(defaultState, {
  [RadioActionType.GET_BY_ARTIST_API](state: RadioReducerType): any {
    return {
      ...state,
      loading: true
    };
  },
  [RadioActionType.GET_BY_ARTIST_API_SUCCESS](
    state: RadioReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      radioArtist: action.payload.data
    };
  },
  [RadioActionType.GET_BY_ARTIST_API_FAILURE](
    state: RadioReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  }
});
