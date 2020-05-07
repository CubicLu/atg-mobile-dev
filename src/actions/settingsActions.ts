import { ActionType, Action, ModalTypeInterface } from './../interfaces';

export const updateSettingsProperty = (property: string, value: any): any => ({
  type: ActionType.UPDATE_SETTINGS_PROPERTY,
  payload: { property, value }
});

export const updateSettingsModal = (
  content: React.ReactNode,
  className?: string,
  height?: number,
  onClick?: Function
): any => ({
  type: ActionType.UPDATE_SETTINGS_MODAL,
  payload: { content, className, height, onClick }
});

export const showToastAction = (): { type: ActionType } => ({
  type: ActionType.SHOW_TOAST
});

export const hideToastAction = (): { type: ActionType } => ({
  type: ActionType.HIDE_TOAST
});

export const updatePopUpModal = (
  modalType: string | null
): Action<ModalTypeInterface> => ({
  type: ActionType.UPDATE_POPUP_MODAL,
  payload: { modalType }
});
