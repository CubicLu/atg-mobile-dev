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
  [ActionType.SET_RADIO_ARTIST](
    state: RadioReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      radioArtist: action.payload
    };
  }
});
