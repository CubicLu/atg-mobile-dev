import {
  Action,
  ModalTypeInterface,
  SettingsActionType,
  ActionProperty
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
): Action<
  SettingsActionType.UPDATE_MODAL,
  {
    content: React.ReactNode;
    className?: string;
    height?: number;
    onClick?: Function;
  }
> => ({
  type: SettingsActionType.UPDATE_MODAL,
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
): Action<SettingsActionType.UPDATE_POPUP_MODAL, ModalTypeInterface> => ({
  type: SettingsActionType.UPDATE_POPUP_MODAL,
  payload: { modalType }
});
