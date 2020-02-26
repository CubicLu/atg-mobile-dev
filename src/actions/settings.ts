import { ActionType } from './../interfaces';

export const updateSettingsProperty = (property: string, value: any): any => ({
  type: ActionType.UPDATE_SETTINGS_PROPERTY,
  payload: { property, value }
});

export const updateSettingsModal = (
  condition: boolean,
  content: React.ReactNode
): any => ({
  type: ActionType.UPDATE_SETTINGS_MODAL,
  payload: { condition, content }
});
