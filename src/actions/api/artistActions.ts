import {
  Action,
  GalleryIdInterface,
  GalleryImageIndexInterface,
  ArtistActionType,
  ActionProperty,
  ArtistInterface,
  APIResponseInterface,
  APIErrorInterface,
  EventInterface,
  VideosBetaInterface
} from './../../models';
import {} from './../../types';

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

export const getArtistsAPI = (): Action<ArtistActionType.GET_ALL_API> => ({
  type: ArtistActionType.GET_ALL_API
});

export const getArtistsAPIFailure = (
  error: APIErrorInterface<string>
): Action<ArtistActionType.GET_ALL_API_FAILURE, APIErrorInterface<string>> => ({
  type: ArtistActionType.GET_ALL_API_FAILURE,
  payload: error
});

export const getArtistsAPISuccess = (
  response: APIResponseInterface<ArtistInterface[]>
): Action<
  ArtistActionType.GET_ALL_API_SUCCESS,
  APIResponseInterface<ArtistInterface[]>
> => ({
  type: ArtistActionType.GET_ALL_API_SUCCESS,
  payload: response
});

export const getArtistAPI = (
  artistId: string
): Action<ArtistActionType.GET_BY_ID_API, string> => ({
  type: ArtistActionType.GET_BY_ID_API,
  payload: artistId
});

export const getArtistAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  ArtistActionType.GET_BY_ID_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: ArtistActionType.GET_BY_ID_API_FAILURE,
  payload: error
});

export const getArtistAPISuccess = (
  response: APIResponseInterface<ArtistInterface>
): Action<
  ArtistActionType.GET_BY_ID_API_SUCCESS,
  APIResponseInterface<ArtistInterface>
> => ({
  type: ArtistActionType.GET_BY_ID_API_SUCCESS,
  payload: response
});

export const clearCurrentArtist = (): Action<ArtistActionType.CLEAR_CURRENT_ARTIST> => ({
  type: ArtistActionType.CLEAR_CURRENT_ARTIST
});

export const getArtistEventAPI = (
  username: string,
  eventId: string
): Action<
  ArtistActionType.GET_EVENT_API,
  { username: string; eventId: string }
> => ({
  type: ArtistActionType.GET_EVENT_API,
  payload: { username, eventId }
});

export const getArtistEventAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  ArtistActionType.GET_EVENT_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: ArtistActionType.GET_EVENT_API_FAILURE,
  payload: error
});

export const getArtistEventAPISuccess = (
  response: APIResponseInterface<EventInterface>
): Action<
  ArtistActionType.GET_EVENT_API_SUCCESS,
  APIResponseInterface<EventInterface>
> => ({
  type: ArtistActionType.GET_EVENT_API_SUCCESS,
  payload: response
});

export const getArtistGalleryCommentsAPI = (
  photoId: number,
  username: string
): Action<
  ArtistActionType.GET_GALLERY_COMMENTS_API,
  { photoId: number; username: string }
> => ({
  type: ArtistActionType.GET_GALLERY_COMMENTS_API,
  payload: { photoId, username }
});

export const getArtistGalleryCommentsAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  ArtistActionType.GET_GALLERY_COMMENTS_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: ArtistActionType.GET_GALLERY_COMMENTS_API_FAILURE,
  payload: error
});

export const getArtistGalleryCommentsAPISuccess = (
  response: APIResponseInterface<any>
): Action<
  ArtistActionType.GET_GALLERY_COMMENTS_API_SUCCESS,
  APIResponseInterface<any>
> => ({
  type: ArtistActionType.GET_GALLERY_COMMENTS_API_SUCCESS,
  payload: response
});

export const getArtistVideosAPI = (
  artistID: string
): Action<ArtistActionType.GET_VIDEO_API, { artistID: string }> => ({
  type: ArtistActionType.GET_VIDEO_API,
  payload: { artistID }
});

export const getArtistVideosAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  ArtistActionType.GET_VIDEO_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: ArtistActionType.GET_VIDEO_API_FAILURE,
  payload: error
});

export const getArtistVideosAPISuccess = (
  response: APIResponseInterface<VideosBetaInterface>
): Action<
  ArtistActionType.GET_VIDEO_API_SUCCESS,
  APIResponseInterface<VideosBetaInterface>
> => ({
  type: ArtistActionType.GET_VIDEO_API_SUCCESS,
  payload: response
});

export const setCurrentGallery = (
  galleryId: number
): Action<ArtistActionType.SET_CURRENT_GALLERY, GalleryIdInterface> => ({
  type: ArtistActionType.SET_CURRENT_GALLERY,
  payload: { galleryId }
});

export const setFullscreenImage = (
  index: number
): Action<
  ArtistActionType.SET_FULLSCREEN_IMAGE,
  GalleryImageIndexInterface
> => ({
  type: ArtistActionType.SET_FULLSCREEN_IMAGE,
  payload: {
    index
  }
});

export const clearFullscreenImage = (): Action<ArtistActionType.CLEAR_FULLSCREEN_IMAGE> => ({
  type: ArtistActionType.CLEAR_FULLSCREEN_IMAGE
});

export const clearCurrentGallery = (): Action<ArtistActionType.CLEAR_CURRENT_GALLERY> => ({
  type: ArtistActionType.CLEAR_CURRENT_GALLERY
});

export const getSupportLevelsAPI = (): Action<ArtistActionType.GET_SUPPORT_LEVELS_API> => ({
  type: ArtistActionType.GET_SUPPORT_LEVELS_API
});

export const getSupportLevelsAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  ArtistActionType.GET_SUPPORT_LEVELS_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: ArtistActionType.GET_SUPPORT_LEVELS_API_FAILURE,
  payload: error
});

export const getSupportLevelsAPISuccess = (
  response: APIResponseInterface<EventInterface>
): Action<
  ArtistActionType.GET_SUPPORT_LEVELS_API_SUCCESS,
  APIResponseInterface<EventInterface>
> => ({
  type: ArtistActionType.GET_SUPPORT_LEVELS_API_SUCCESS,
  payload: response
});
