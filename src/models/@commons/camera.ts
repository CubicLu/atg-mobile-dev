export interface CameraOptions {
  readonly quality?: number; // Picture quality in range 0-100. Default is 50
  readonly sourceType?: number; //1 Camera, 2. SavedPhotoAlbum, 0. PhotoLibrary
  readonly allowEdit?: boolean;
  readonly encodingType?: number; //0 JPEG 1 PNG
  readonly targetWidth?: number;
  readonly targetHeight?: number;
  readonly mediaType?: number; //0. PICTURE, 1.VIDEO, 2.ALLMEDIA
  readonly correctOrientation?: boolean; // Rotate to correct for the orientation */
  readonly saveToPhotoAlbum?: boolean; //save after capture
  readonly cameraDirection?: number; //1.back and 0.front
  readonly destinationType?: number;
  /**
   * Choose the format of the return value.
   * Defined in navigator.camera.DestinationType. Default is FILE_URI.
   *      DATA_URL : 0,   Return image as base64-encoded string
   *      FILE_URI : 1,   Return image file URI
   *      NATIVE_URI : 2  Return image native URI
   *          (e.g., assets-library:// on iOS or content:// on Android)
   */
}
export interface Camera {
  cleanup(onSuccess: () => void, onError: (message: string) => void): void;
  getPicture(
    cameraSuccess: (data: string) => void,
    cameraError: (message: string) => void,
    cameraOptions?: CameraOptions
  ): void;
}
