import {
  Action,
  GalleryIdInterface,
  GalleryImageIndexInterface,
  ActionCallbackInterface,
  ArtistActionType,
  ActionProperty,
  ArtistInterface
} from './../../interfaces';
import { AxiosError } from 'axios';

export const updateArtistProperty = (
  property: string,
  value: any
): Action<ArtistActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: ArtistActionType.UPDATE_PROPERTY,
  payload: { property, value }
});

export const updateArtistSetInitialProperty = (
  property: string
): Action<ArtistActionType.UPDATE_SET_INITIAL_PROPERTY, string> => ({
  type: ArtistActionType.UPDATE_SET_INITIAL_PROPERTY,
  payload: property
});

export const getAllAPI = (): Action<ArtistActionType.GET_ALL_API> => ({
  type: ArtistActionType.GET_ALL_API
});

export const getArtistsAPIFailure = (
  error
): Action<ArtistActionType.GET_ALL_API_FAILURE, AxiosError> => ({
  type: ArtistActionType.GET_ALL_API_FAILURE,
  payload: error
});

export const getArtistsAPISuccess = (
  response
): Action<ArtistActionType.GET_ALL_API_SUCCESS, AxiosResponse<ArtistInterface[]>> => ({
  type: ArtistActionType.GET_ALL_API_SUCCESS,
  payload: response
});

export const getArtistAPI = (username: string): any => ({
  type: ArtistActionType.GET_BY_USERNAME_API,
  payload: username
});

export const getArtistAPIFailure = (error): any => ({
  type: ArtistActionType.GET_BY_USERNAME_API_FAILURE,
  payload: error
});

export const getArtistAPISuccess = (response): any => ({
  type: ArtistActionType.GET_BY_USERNAME_API_SUCCESS,
  payload: response
});

export const getArtistEventAPI = (username: string, eventId: string): any => ({
  type: ArtistActionType.GET_EVENT_API,
  payload: { username, eventId }
});

export const getArtistEventAPIFailure = (error): any => ({
  type: ArtistActionType.GET_EVENT_API_FAILURE,
  payload: error
});

export const getArtistEventAPISuccess = (response): any => ({
  type: ArtistActionType.GET_EVENT_API_SUCCESS,
  payload: response
});

export const getArtistGalleryCommentsAPI = (
  photoId: number,
  username: string
): any => ({
  type: ArtistActionType.GET_GALLERY_COMMENTS_API,
  payload: { photoId, username }
});

export const getArtistGalleryCommentsAPIFailure = (error): any => ({
  type: ArtistActionType.GET_GALLERY_COMMENTS_API_FAILURE,
  payload: error
});

export const getArtistGalleryCommentsAPISuccess = (response): any => ({
  type: ArtistActionType.GET_GALLERY_COMMENTS_API_SUCCESS,
  payload: response
});

export const setCurrentGallery = (
  galleryId: number
): ActionCallbackInterface<GalleryIdInterface> => ({
  type: ArtistActionType.SET_CURRENT_GALLERY,
  payload: {
    galleryId
  }
});

export const setFullscreenImage = (
  index: number
): Action<GalleryImageIndexInterface> => ({
  type: ArtistActionType.SET_FULLSCREEN_IMAGE,
  payload: {
    index
  }
});

export const clearFullscreenImage = (): { type: ActionType } => ({
  type: ArtistActionType.CLEAR_FULLSCREEN_IMAGE
});

export const clearCurrentGallery = (): { type: ActionType } => ({
  type: ArtistActionType.CLEAR_CURRENT_GALLERY
});
