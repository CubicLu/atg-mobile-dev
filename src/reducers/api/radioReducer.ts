import createReducer from '../createReducer';
import { Action, RadioActionType, RadioReducerType } from '../../models';

const defaultState: RadioReducerType = {
  radioArtist: null,
  loading: false,
  errorMessage: null
};

export const radioReducer = createReducer<RadioReducerType>(defaultState, {
  [RadioActionType.GET_BY_RADIO_ARTIST_API](
    state: RadioReducerType
  ): RadioReducerType {
    return {
      ...state,
      loading: true
    };
  },
  [RadioActionType.GET_BY_RADIO_ARTIST_API_SUCCESS](
    state: RadioReducerType,
    action: Action<RadioActionType.GET_BY_RADIO_ARTIST_API_SUCCESS>
  ): RadioReducerType {
    return {
      ...state,
      loading: false,
      radioArtist: action.payload.data
    };
  },
  [RadioActionType.GET_BY_RADIO_ARTIST_API_FAILURE](
    state: RadioReducerType,
    action: Action<RadioActionType.GET_BY_RADIO_ARTIST_API_FAILURE>
  ): RadioReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  }
});
