import {
  Action,
  SubscriberActionType,
  SubscriberReducerType,
  APIResponseInterface,
  APIErrorInterface,
  SubscriberArtistSupportedInterface
} from './../../models';
import createReducer from './../createReducer';

const defaultState: SubscriberReducerType = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  artists: []
};

export const subscriberReducer = createReducer<SubscriberReducerType>(
  defaultState,
  {
    [SubscriberActionType.UPDATE_PROPERTY](
      state: SubscriberReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    },
    [SubscriberActionType.GET_ARTISTS_API](
      state: SubscriberReducerType
    ): SubscriberReducerType {
      return {
        ...state,
        loading: true
      };
    },
    [SubscriberActionType.GET_ARTISTS_API_SUCCESS](
      state: SubscriberReducerType,
      action: Action<
        SubscriberActionType.GET_ARTISTS_API_SUCCESS,
        APIResponseInterface<{ data: SubscriberArtistSupportedInterface[] }>
      >
    ): SubscriberReducerType {
      return {
        ...state,
        loading: false,
        artists: action.payload?.data
      };
    },

    [SubscriberActionType.GET_ARTISTS_API_FAILURE](
      state: SubscriberReducerType,
      action: Action<
        SubscriberActionType.GET_ARTISTS_API_SUCCESS,
        APIErrorInterface<string>
      >
    ): SubscriberReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.message
      };
    }
  }
);
