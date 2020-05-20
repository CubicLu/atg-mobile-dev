import {
  Action,
  SettingsActionType,
  SettingsReducerType,
  ModalTypeInterface,
  FilterItemInterface,
  UpdateModalWrapperClassName,
  ActionSheetInterface
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
  actionSheet: null,
  modal: {
    content: null,
    height: 40,
    onClick: (): void => {},
    onClose: (): void => {},
    onClosing: (): void => {},
    onOpen: (): void => {},
    wrapperClassName: null
  },
  showToast: false,
  popUpModal: null,
  activeTab: 'profile',
  activeFanTab: 'artists',
  fanTabs: myProfileTabs,
  activeBioFriendTab: 'my-bio',
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

    [SettingsActionType.UPDATE_ACTIONSHEET](
      state: SettingsReducerType,
      action: Action<ActionSheetInterface>
    ): SettingsReducerType {
      return {
        ...state,
        actionSheet: action.payload
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
    [SettingsActionType.UPDATE_MODAL_WRAPPER_CLASSNAME](
      state: SettingsReducerType,
      action: Action<UpdateModalWrapperClassName>
    ): SettingsReducerType {
      return {
        ...state,
        modal: {
          ...state.modal,
          wrapperClassName: action.payload.wrapperClassName
        }
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
