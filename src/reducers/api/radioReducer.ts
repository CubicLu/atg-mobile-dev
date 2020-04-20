import { Action, ActionType, RadioReducerType } from '../../interfaces';
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
  [ActionType.GET_RADIO_ARTIST](state: RadioReducerType): any {
    return {
      ...state,
      loading: true
    };
  },
  [ActionType.GET_RADIO_ARTIST_SUCCESS](
    state: RadioReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      radioArtist: action.payload.data
    };
  },
  [ActionType.GET_RADIO_ARTIST_FAILURE](
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
