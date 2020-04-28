import {
  ActionType,
  Action,
  GalleryIdInterface,
  GalleryImageIndexInterface,
  ActionCallbackInterface
} from './../../interfaces';

export const updateArtistProperty = (property: string, value: any): any => ({
  type: ActionType.UPDATE_ARTIST_PROPERTY,
  payload: { property, value }
});

export const updateArtistSetInitialProperty = (property: string): any => ({
  type: ActionType.UPDATE_ARTIST_SET_INITIAL_PROPERTY,
  payload: property
});

export const getArtistsAPI = (): any => ({
  type: ActionType.GET_ARTISTS_API
});

export const getArtistsAPIFailure = (error): any => ({
  type: ActionType.GET_ARTISTS_API_FAILURE,
  payload: error
});

export const getArtistsAPISuccess = (response): any => ({
  type: ActionType.GET_ARTISTS_API_SUCCESS,
  payload: response
});

export const getArtistAPI = (username: string): any => ({
  type: ActionType.GET_ARTIST_API,
  payload: username
});

export const getArtistAPIFailure = (error): any => ({
  type: ActionType.GET_ARTIST_API_FAILURE,
  payload: error
});

export const getArtistAPISuccess = (response): any => ({
  type: ActionType.GET_ARTIST_API_SUCCESS,
  payload: response
});

export const getArtistEventAPI = (username: string, eventId: string): any => ({
  type: ActionType.GET_ARTIST_EVENT_API,
  payload: { username, eventId }
});

export const getArtistEventAPIFailure = (error): any => ({
  type: ActionType.GET_ARTIST_EVENT_API_FAILURE,
  payload: error
});

export const getArtistEventAPISuccess = (response): any => ({
  type: ActionType.GET_ARTIST_EVENT_API_SUCCESS,
  payload: response
});

export const getArtistGalleryCommentsAPI = (
  photoId: number,
  username: string
): any => ({
  type: ActionType.GET_ARTIST_GALLERY_COMMENTS_API,
  payload: { photoId, username }
});

export const getArtistGalleryCommentsAPIFailure = (error): any => ({
  type: ActionType.GET_ARTIST_GALLERY_COMMENTS_API_FAILURE,
  payload: error
});

export const getArtistGalleryCommentsAPISuccess = (response): any => ({
  type: ActionType.GET_ARTIST_GALLERY_COMMENTS_API_SUCCESS,
  payload: response
});

export const setCurrentGallery = (
  galleryId: number
): ActionCallbackInterface<GalleryIdInterface> => ({
  type: ActionType.SET_CURRENT_GALLERY,
  payload: {
    galleryId
  }
});

export const setFullscreenImage = (
  index: number
): Action<GalleryImageIndexInterface> => ({
  type: ActionType.SET_FULLSCREEN_IMAGE,
  payload: {
    index
  }
});

export const clearFullscreenImage = (): { type: ActionType } => ({
  type: ActionType.CLEAR_FULLSCREEN_IMAGE
});

export const clearCurrentGallery = (): { type: ActionType } => ({
  type: ActionType.CLEAR_CURRENT_GALLERY
});
