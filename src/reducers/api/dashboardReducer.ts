import {
  Action,
  ActionType,
  DashboardReducerType,
  DashboardInterface,
  APIResponseInterface,
  APIErrorInterface
} from '../../interfaces';
import createReducer from './../createReducer';

const defaultState: DashboardReducerType = {
  dashboard: null,
  loading: false,
  successMessage: null,
  errorMessage: null
};

export const dashboardReducer = createReducer<DashboardReducerType>(
  defaultState,
  {
    [ActionType.UPDATE_DASHBOARD_PROPERTY](
      state: DashboardReducerType,
      action: Action<any>
    ): DashboardReducerType {
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    },

    [ActionType.UPDATE_DASHBOARD_SET_INITIAL_PROPERTY](
      state: DashboardReducerType,
      action: Action<any>
    ): DashboardReducerType {
      return {
        ...state,
        [action.payload]: defaultState[action.payload]
      };
    },

    [ActionType.GET_DASHBOARD_BY_ARTIST_API](state: DashboardReducerType): any {
      return {
        ...state,
        loading: true
      };
    },

    [ActionType.GET_DASHBOARD_BY_ARTIST_API_SUCCESS](
      state: DashboardReducerType,
      action: Action<APIResponseInterface<DashboardInterface>>
    ): DashboardReducerType {
      return {
        ...state,
        loading: false,
        dashboard: action.payload.data
      };
    },

    [ActionType.GET_DASHBOARD_BY_ARTIST_API_FAILURE](
      state: DashboardReducerType,
      action: Action<APIErrorInterface<any>>
    ): DashboardReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message
      };
    }
  }
);
