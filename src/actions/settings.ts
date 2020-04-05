import { ActionType } from './../interfaces';

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
