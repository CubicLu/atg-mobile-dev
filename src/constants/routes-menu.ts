import { RouteInterface } from './../interfaces';
interface RouteArtist extends RouteInterface {
  label: string;
}
export const routeArtistMenu: RouteArtist[] = [
  { id: '0', label: 'DASHBOARD', path: '/dashboard/artist/:id' },
  { id: '1', label: 'FEATURED', path: '/artist/:id/' },
  { id: '2', label: 'BIO', path: '/artist/:id/biography' },
  { id: '3', label: 'SOCIAL', path: '/community/artist/:id' },
  { id: '4', label: 'RADIO', path: '/radio/:id' },
  { id: '5', label: 'DEEP DIVE', path: '/artist/:id/deep-dive' },
  { id: '6', label: 'ALBUMS', path: '/artist/:id/tab/albums' },
  { id: '7', label: 'EVENTS', path: '/artist/:id/event' },
  { id: '8', label: 'PHOTOS', path: '/artist/:id/gallery' },
  { id: '9', label: 'VIDEOS', path: '/artist/:id/video' }
];
