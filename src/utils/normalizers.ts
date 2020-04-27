import { AlbumInterface, GalleryInterface } from '../interfaces';

export const transformGalleryToFlatArr = (
  gallery?: GalleryInterface
): any[] | null => {
  return gallery
    ? [
        { image: gallery.cover },
        ...gallery?.items.map(
          (item): AlbumInterface[][] => item[Object.keys(item)[0]]
        )
      ].flat()
    : null;
};
