import { ActionType } from './../../interfaces';

export const updateArtistProperty = (property: string, value: any): any => ({
  type: ActionType.UPDATE_ARTIST_PROPERTY,
  payload: { property, value }
});
