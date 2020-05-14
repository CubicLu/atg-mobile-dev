import {
  Action,
  DashboardInterface,
  APIErrorInterface,
  APIResponseInterface,
  ActionProperty,
  DashboardActionType
} from './../../models';

export const updateDashboardProperty = (
  property: string,
  value: any
): Action<DashboardActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: DashboardActionType.UPDATE_PROPERTY,
  payload: { property, value }
});

export const updateDashboardSetInitialProperty = (
  property: string
): Action<string> => ({
  type: DashboardActionType.UPDATE_SET_INITIAL_PROPERTY,
  payload: property
});

export const getDashboardByArtistAPI = (
  username: string
): Action<DashboardActionType.GET_BY_DASH_ARTIST_API, string> => ({
  type: DashboardActionType.GET_BY_DASH_ARTIST_API,
  payload: username
});

export const getDashboardByArtistAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  DashboardActionType.GET_BY_DASH_ARTIST_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: DashboardActionType.GET_BY_DASH_ARTIST_API_FAILURE,
  payload: error
});

export const getDashboardByArtistAPISuccess = (
  response: APIResponseInterface<DashboardInterface>
): Action<
  DashboardActionType.GET_BY_DASH_ARTIST_API_SUCCESS,
  APIResponseInterface<DashboardInterface>
> => ({
  type: DashboardActionType.GET_BY_DASH_ARTIST_API_SUCCESS,
  payload: response
});
