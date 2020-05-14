import {
  Action,
  SubscriberActionType,
  ActionProperty,
  APIResponseInterface,
  APIErrorInterface,
  SubscriberArtistSupportedInterface
} from './../../models';

export const updateSubscriberProperty = (
  property: string,
  value: any
): Action<SubscriberActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: SubscriberActionType.UPDATE_PROPERTY,
  payload: { property, value }
});

export const getSubscriberArtistsAPI = (
  subscriberId: number
): Action<SubscriberActionType.GET_ARTISTS_API> => ({
  type: SubscriberActionType.GET_ARTISTS_API,
  payload: subscriberId
});

export const getSubscriberArtistsAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  SubscriberActionType.GET_ARTISTS_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: SubscriberActionType.GET_ARTISTS_API_FAILURE,
  payload: error
});

export const getSubscriberArtistsAPISuccess = (
  response: APIResponseInterface<SubscriberArtistSupportedInterface[]>
): Action<
  SubscriberActionType.GET_ARTISTS_API_SUCCESS,
  APIResponseInterface<SubscriberArtistSupportedInterface[]>
> => ({
  type: SubscriberActionType.GET_ARTISTS_API_SUCCESS,
  payload: response
});
