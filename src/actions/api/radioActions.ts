import {
  RadioActionType,
  Action,
  APIErrorInterface,
  APIResponseInterface,
  ChannelInterface
} from '../../models';

export const getRadioArtistAPI = (
  query: string
): Action<RadioActionType.GET_BY_RADIO_ARTIST_API> => ({
  type: RadioActionType.GET_BY_RADIO_ARTIST_API,
  payload: query
});

export const getRadioArtistAPISuccess = (
  response: APIResponseInterface<ChannelInterface>
): Action<
  RadioActionType.GET_BY_RADIO_ARTIST_API_SUCCESS,
  APIResponseInterface<ChannelInterface>
> => ({
  type: RadioActionType.GET_BY_RADIO_ARTIST_API_SUCCESS,
  payload: response
});

export const getRadioArtistAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  RadioActionType.GET_BY_RADIO_ARTIST_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: RadioActionType.GET_BY_RADIO_ARTIST_API_FAILURE,
  payload: error
});
