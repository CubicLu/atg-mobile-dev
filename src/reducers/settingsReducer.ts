/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Action,
  ActionType,
  SettingsReducerType,
  ModalTypeInterface
} from './../interfaces';

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
  dashboardTabs
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
  activeProfileFriendTab: 'fan-profile',
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
  activeDashboardTab: 'wallet',
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
  notifications: 10
};

export const settingsReducer = createReducer<SettingsReducerType>(
  defaultState,
  {
    [ActionType.UPDATE_SETTINGS_PROPERTY](
      state: SettingsReducerType,
      action: Action<any>
    ): SettingsReducerType {
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    },

    [ActionType.UPDATE_SETTINGS_MODAL](
      state: SettingsReducerType,
      action: Action<any>
    ): SettingsReducerType {
      return {
        ...state,
        modal: { ...action.payload }
      };
    },
    [ActionType.UPDATE_POPUP_MODAL](
      state: SettingsReducerType,
      action: Action<ModalTypeInterface>
    ) {
      return {
        ...state,
        popUpModal: action.payload.modalType
      };
    },
    [ActionType.SHOW_TOAST](state: SettingsReducerType) {
      return {
        ...state,
        showToast: true
      };
    },
    [ActionType.HIDE_TOAST](state: SettingsReducerType) {
      return {
        ...state,
        showToast: false
      };
    }
  }
);
