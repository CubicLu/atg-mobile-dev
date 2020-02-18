export interface Action<T> {
    type: ActionType;
    payload: T;
}

export enum ActionType {
    UPDATE_SETTINGS_PROPERTY = 'UPDATE_SETTINGS_PROPERTY'
}

export interface TabsInterface {
    path: string,
    icon: any,
    id: string,
    component: any,
    redirect?: boolean
}
