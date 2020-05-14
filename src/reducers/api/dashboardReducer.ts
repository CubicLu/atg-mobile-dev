import {
  Action,
  DashboardActionType,
  DashboardReducerType,
  DashboardInterface,
  APIResponseInterface,
  APIErrorInterface,
  ActionProperty
} from '../../models';
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
    [DashboardActionType.UPDATE_PROPERTY](
      state: DashboardReducerType,
      action: Action<DashboardActionType.UPDATE_PROPERTY, ActionProperty<any>>
    ): DashboardReducerType {
      return {
        ...state,
        [action.payload!.property]: action.payload!.value
      };
    },

    [DashboardActionType.UPDATE_SET_INITIAL_PROPERTY](
      state: DashboardReducerType,
      action: Action<DashboardActionType.UPDATE_SET_INITIAL_PROPERTY, string>
    ): DashboardReducerType {
      return {
        ...state,
        [action.payload!]: defaultState[action.payload!]
      };
    },

    [DashboardActionType.GET_BY_DASH_ARTIST_API](
      state: DashboardReducerType
    ): DashboardReducerType {
      return {
        ...state,
        loading: true
      };
    },

    [DashboardActionType.GET_BY_DASH_ARTIST_API_SUCCESS](
      state: DashboardReducerType,
      action: Action<
        DashboardActionType.GET_BY_DASH_ARTIST_API_SUCCESS,
        APIResponseInterface<DashboardInterface>
      >
    ): DashboardReducerType {
      return {
        ...state,
        loading: false,
        dashboard: action.payload!.data
      };
    },

    [DashboardActionType.GET_BY_DASH_ARTIST_API_FAILURE](
      state: DashboardReducerType,
      action: Action<
        DashboardActionType.GET_BY_DASH_ARTIST_API_FAILURE,
        APIErrorInterface<any>
      >
    ): DashboardReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.message
      };
    }
  }
);
