interface RouteArtist {
  id: string;
  label: string;
  path: string;
}
export const routeArtistMenu: RouteArtist[] = [
  { id: '0', label: 'DASHBOARD', path: '/dashboard/:id' },
  { id: '1', label: 'FEATURED', path: '/artist/:id/' },
  { id: '2', label: 'BIO', path: '/artist/:id/biography' },
  { id: '3', label: 'COMMUNITY', path: '/community/artist/:id' },
  { id: '4', label: 'RADIO', path: '/radio/artist/:id' },
  { id: '5', label: 'DEEP DIVE', path: '/artist/:id/deep-dive' },
  { id: '6', label: 'ALBUMS', path: '/artist/:id/tab/albums' },
  { id: '7', label: 'EVENTS', path: '/artist/:id/event' },
  { id: '8', label: 'PHOTOS', path: '/artist/:id/gallery' },
  { id: '9', label: 'VIDEOS', path: '/artist/:id/video' }
];
