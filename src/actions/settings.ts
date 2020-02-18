import {
    ActionType
} from './../interfaces';

export const updateSettingsProperty = (property: string, value: any) => ({
    type: ActionType.UPDATE_SETTINGS_PROPERTY,
    payload: {property, value}
});
