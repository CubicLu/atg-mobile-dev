import {
  RadioActionType,
  Action,
  APIErrorInterface,
  APIResponseInterface
} from '../../interfaces';

export const getRadioArtistAPI = (
  query: string
): Action<RadioActionType.GET_BY_ARTIST_API> => ({
  type: RadioActionType.GET_BY_ARTIST_API,
  payload: query
});

export const getRadioArtistAPISuccess = (
  response: APIResponseInterface<string>
): Action<
  RadioActionType.GET_BY_ARTIST_API_SUCCESS,
  APIResponseInterface<string>
> => ({
  type: RadioActionType.GET_BY_ARTIST_API_SUCCESS,
  payload: response
});

export const getRadioArtistAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  RadioActionType.GET_BY_ARTIST_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: RadioActionType.GET_BY_ARTIST_API_FAILURE,
  payload: error
});
