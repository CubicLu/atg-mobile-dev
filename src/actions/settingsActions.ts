import {
  Action,
  ModalTypeInterface,
  SettingsActionType,
  ActionProperty,
  UpdateModalInterface
} from './../models';

export const updateSettingsProperty = (
  property: string,
  value: any
): Action<SettingsActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: SettingsActionType.UPDATE_PROPERTY,
  payload: { property, value }
});

export const updateSettingsModal = (
  content: React.ReactNode,
  className?: string,
  height?: number,
  onClick?: Function
): Action<SettingsActionType.UPDATE_MODAL, UpdateModalInterface> => ({
  type: SettingsActionType.UPDATE_MODAL,
  payload: { content, className, height, onClick }
});

export const showToastAction = (): Action<SettingsActionType.SHOW_TOAST> => ({
  type: SettingsActionType.SHOW_TOAST
});

export const hideToastAction = (): Action<SettingsActionType.HIDE_TOAST> => ({
  type: SettingsActionType.HIDE_TOAST
});

export const updatePopUpModal = (
  modalType: string | null
): Action<SettingsActionType.UPDATE_POPUP_MODAL, ModalTypeInterface> => ({
  type: SettingsActionType.UPDATE_POPUP_MODAL,
  payload: { modalType }
});
