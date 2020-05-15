import {
  Action,
  SettingsActionType,
  SettingsReducerType,
  ModalTypeInterface,
  FilterItemInterface
} from '../models';
import createReducer from './createReducer';
import {
  contactTabs,
  deepDiveTabs,
  messageTabs,
  mainTabs,
  routes,
  plans,
  artistTabs,
  myProfileTabs,
  profileFriendTabs,
  dashboardTabs,
  settingsMenu
} from './../constants';

const defaultState: SettingsReducerType = {
  modal: {
    content: null,
    height: 40,
    onClick: (): void => {},
    onClose: (): void => {},
    onClosing: (): void => {},
    onOpen: (): void => {}
  },
  showToast: false,
  popUpModal: null,
  activeTab: 'profile',
  activeFanTab: 'artists',
  fanTabs: myProfileTabs,
  activeProfileFriendTab: 'my-bio',
  profileFriendTabs: profileFriendTabs,
  artistTabs: artistTabs,
  plans: plans,
  selectedPlan: null,
  routes: routes,
  tabs: mainTabs,
  activeDeepDiveTab: 'lyrics',
  deepDiveTabs: deepDiveTabs,
  messageTabs: messageTabs,
  activeMessageTab: 'chat',
  selectContactTabs: contactTabs,
  activeSelectContactTab: 'friends',
  dashboardTabs: dashboardTabs,
  activeDashboardTab: 'analytic',
  eraFilters: [],
  era: '',
  subEra: [
    {
      name: '',
      selected: false
    }
  ],
  genreFilters: [],
  selectedGenres: [],
  notifications: 10,
  settingsMenu: settingsMenu,
  selectedEras: []
};

export const settingsReducer = createReducer<SettingsReducerType>(
  defaultState,
  {
    [SettingsActionType.UPDATE_PROPERTY](
      state: SettingsReducerType,
      action: Action<any>
    ): SettingsReducerType {
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    },

    [SettingsActionType.UPDATE_MODAL](
      state: SettingsReducerType,
      action: Action<any>
    ): SettingsReducerType {
      return {
        ...state,
        modal: { ...action.payload }
      };
    },

    [SettingsActionType.UPDATE_POPUP_MODAL](
      state: SettingsReducerType,
      action: Action<ModalTypeInterface>
    ): SettingsReducerType {
      return {
        ...state,
        popUpModal: action.payload.modalType
      };
    },
    [SettingsActionType.SHOW_TOAST](
      state: SettingsReducerType
    ): SettingsReducerType {
      return {
        ...state,
        showToast: true
      };
    },
    [SettingsActionType.HIDE_TOAST](
      state: SettingsReducerType
    ): SettingsReducerType {
      return {
        ...state,
        showToast: false
      };
    },

    [SettingsActionType.REMOVE_SELECTED_ERA](
      state: SettingsReducerType,
      action: Action<FilterItemInterface>
    ): SettingsReducerType {
      let eraFilters = [...state.eraFilters];
      eraFilters.splice(action.payload.i, 1);
      return {
        ...state,
        eraFilters: eraFilters
      };
    },

    [SettingsActionType.REMOVE_SELECTED_GENRE](
      state: SettingsReducerType,
      action: Action<FilterItemInterface>
    ): SettingsReducerType {
      let selectedGenres = [...state.selectedGenres];
      selectedGenres.splice(action.payload.i, 1);
      return {
        ...state,
        selectedGenres: selectedGenres
      };
    }
  }
);
