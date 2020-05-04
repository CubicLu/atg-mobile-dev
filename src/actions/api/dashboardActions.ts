import {
  ActionType,
  Action,
  DashboardInterface,
  APIErrorInterface,
  APIResponseInterface
} from './../../interfaces';

export const updateDashboardProperty = (
  property: string,
  value: any
): Action<{ property: string; value: any }> => ({
  type: ActionType.UPDATE_DASHBOARD_PROPERTY,
  payload: { property, value }
});

export const updateDashboardSetInitialProperty = (
  property: string
): Action<string> => ({
  type: ActionType.UPDATE_DASHBOARD_SET_INITIAL_PROPERTY,
  payload: property
});

export const getDashboardByArtistAPI = (username: string): Action<string> => ({
  type: ActionType.GET_DASHBOARD_BY_ARTIST_API,
  payload: username
});

export const getDashboardByArtistAPIFailure = (
  error: APIErrorInterface<string>
): Action<APIErrorInterface<string>> => ({
  type: ActionType.GET_DASHBOARD_BY_ARTIST_API_FAILURE,
  payload: error
});

export const getDashboardByArtistAPISuccess = (
  response: APIResponseInterface<DashboardInterface>
): Action<APIResponseInterface<DashboardInterface>> => ({
  type: ActionType.GET_DASHBOARD_BY_ARTIST_API_SUCCESS,
  payload: response
});
