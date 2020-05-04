import { MenuInterface } from './../../interfaces';
import {
  ArtistDeepDiveLyricsPage,
  ArtistDeepDivePedigreePage,
  ArtistDeepDiveCataloguePage
} from '../../pages';
export const deepDiveTabs: MenuInterface[] = [
  {
    id: 'lyrics',
    label: 'Lyrics',
    icon: 'l',
    component: ArtistDeepDiveLyricsPage
  },
  {
    id: 'pedigree',
    label: 'Pedigree',
    icon: 'p',
    component: ArtistDeepDivePedigreePage
  },
  {
    id: 'catalogue',
    label: 'Catalogue',
    icon: 'c',
    component: ArtistDeepDiveCataloguePage
  }
];
