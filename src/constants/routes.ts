import { RouteInterface } from './../interfaces';
import {
  ArtistPage,
  ProfilePage,
  DashboardPage,
  ArtistSupportPage,
  ArtistGalleryPhotoPage,
  ArtistGalleryGridPage,
  ArtistDeepDivePage,
  ArtistEventDetailPage,
  ArtistGalleryPage,
  ArtistBiographyPage,
  ArtistEventsPage,
  CommunityPostPage,
  CommunityNewPostPage,
  TrackListPage,
  CommunityDailyDripPage,
  CommunityAllArtistsPage,
  CommunityPage,
  CommunityArtistPage,
  ThankYouPage,
  ArtistVideoDetailPage,
  ArtistVideosPage,
  RadioFilterPage,
  RadioStationEditPage,
  RadioPage,
  MessageNotificationDetailPage,
  MessageSelectContactPage,
  MessagePage,
  RadioArtistPage,
  RadioHistoryPage,
  FanFeedFilterPage,
  SettingsPage,
  FriendPage,
  VaultFilterPage,
  VaultFilterGenrePage,
  VaultFilterEraPage,
  VaultFilterSubEraPage,
  DashboardMenuPage,
  FeedPage,
  CommunitySharePage,
  CommunityArtistFilterPage,
  ViewAllStationsPage,
  ChatPage,
  DashboardFilterPage,
  DashboardAnalyticDetailPage,
  DashboardSupporterPage,
  ArtistGatewayPage
} from '../pages';
export const routes: RouteInterface[] = [
  {
    path: '/artist/:id',
    id: 'artistPage',
    component: ArtistPage
  },
  {
    path: '/artist/:id/tab/:tab',
    id: 'artistPageAlbum',
    component: ArtistPage
  },
  {
    path: '/',
    id: 'profilePageInitial',
    component: ProfilePage
  },
  {
    path: '/profile/:id',
    id: 'fanProfile',
    component: ProfilePage
  },
  {
    path: '/artist/:id/support',
    id: 'artistSupport',
    component: ArtistSupportPage
  },
  {
    path: '/artist/:id/gallery/:galleryId/image/:imageId',
    id: 'profileGallery',
    component: ArtistGalleryPhotoPage
  },
  {
    path: '/artist/:id/gallery/:galleryId',
    id: 'profileGalleryGrid',
    component: ArtistGalleryGridPage
  },
  {
    path: '/artist/:id/deep-dive',
    id: 'artistDeepDive',
    component: ArtistDeepDivePage
  },
  {
    path: '/artist/:id/event/:eventId',
    id: 'artistEvent',
    component: ArtistEventDetailPage
  },
  {
    path: '/artist/:id/gallery',
    id: 'artistGallery',
    component: ArtistGalleryPage
  },
  {
    path: '/artist/:id/biography',
    id: 'artistBiography',
    component: ArtistBiographyPage
  },
  {
    path: '/artist/:id/event/:eventId',
    id: 'artistEventDetail',
    component: ArtistEventDetailPage
  },
  {
    path: '/artist/:id/event',
    id: 'artistEvents',
    component: ArtistEventsPage
  },
  {
    path: '/community/comments/:id',
    id: 'communityComments',
    component: CommunityPostPage
  },
  {
    path: '/community/post',
    id: 'communityPost',
    component: CommunityNewPostPage
  },
  {
    path: '/track/:reference/:referenceId/:id',
    id: 'tracklist',
    component: TrackListPage
  },
  {
    path: '/community/artist/:artistId/daily-drip/:dailyDripId',
    id: 'communityArtistDailyDrip',
    component: CommunityDailyDripPage
  },
  {
    path: '/community/artist',
    id: 'communityArtist',
    component: CommunityAllArtistsPage
  },
  {
    path: '/community',
    id: 'communityArtist',
    component: CommunityPage
  },
  {
    path: '/community/artist/:artistId',
    id: 'communityArtist',
    component: CommunityArtistPage
  },
  {
    path: '/thank-you',
    id: 'thankYou',
    component: ThankYouPage
  },
  {
    path: '/artist/:id/video/:videoId',
    id: 'artistVideo',
    component: ArtistVideoDetailPage
  },
  {
    path: '/artist/:id/video',
    id: 'artistVideos',
    component: ArtistVideosPage
  },
  {
    path: '/radio/filter',
    id: 'radioFilter',
    component: RadioFilterPage
  },
  {
    path: '/radio/station/edit/:id',
    id: 'radioStationEdit',
    component: RadioStationEditPage
  },
  {
    path: '/radio/station/create',
    id: 'radioStationEdit',
    component: RadioStationEditPage
  },
  {
    path: '/radio/genre/:genre',
    id: 'radioHome',
    component: RadioPage
  },
  {
    path: '/message/notification/:id',
    id: 'message-notification',
    component: MessageNotificationDetailPage
  },
  {
    path: '/message/chat/new',
    id: 'message-chat-new',
    component: MessageSelectContactPage
  },
  {
    path: '/message/chat/:id',
    id: 'message-chat-by-id',
    component: MessageSelectContactPage
  },
  {
    path: '/message/select-contact',
    id: 'message-select-contact',
    component: MessageSelectContactPage
  },
  {
    path: '/message',
    id: 'message',
    component: MessagePage
  },
  {
    path: '/chat',
    id: 'chat',
    component: ChatPage
  },
  {
    path: '/profile/:id',
    id: 'fanProfile',
    component: ProfilePage
  },
  {
    path: '/radio/:id',
    id: 'radioArtist',
    component: RadioArtistPage
  },
  {
    path: '/radio/:id/history',
    id: 'radioHistory',
    component: RadioHistoryPage
  },
  {
    path: '/fan-feed-filter',
    id: 'fan-feed-filter',
    component: FanFeedFilterPage
  },
  {
    path: '/settings',
    id: 'settings',
    component: SettingsPage
  },
  {
    path: '/me',
    id: 'settings',
    component: SettingsPage
  },
  {
    path: '/friend',
    id: 'friend',
    component: FriendPage
  },
  {
    path: '/vault-filter',
    id: 'vault-filter',
    component: VaultFilterPage
  },
  {
    path: '/vault-filter/genre',
    id: 'vault-filter-genre',
    component: VaultFilterGenrePage
  },
  {
    path: '/vault-filter/era',
    id: 'vault-filter-era',
    component: VaultFilterEraPage
  },
  {
    path: '/vault-filter/era/sub-era',
    id: 'vault-filter-sub-era',
    component: VaultFilterSubEraPage
  },
  {
    path: '/radio/:id',
    id: 'radioArtist',
    component: RadioArtistPage
  },
  {
    path: '/radio/:id/history',
    id: 'radioHistory',
    component: RadioHistoryPage
  },
  {
    path: '/dashboard/menu/:id',
    id: 'artistDashboardMenu',
    component: DashboardMenuPage
  },
  {
    path: '/dashboard/artist/:id',
    id: 'artistDashboard',
    component: DashboardPage
  },
  {
    path: '/dashboard/analytic/:id',
    id: 'analyticDetailDashboard',
    component: DashboardAnalyticDetailPage
  },
  {
    path: '/dashboard/filter',
    id: 'filterDashboard',
    component: DashboardFilterPage
  },
  {
    path: '/feed/:id',
    id: 'feedFan',
    component: FeedPage
  },
  {
    path: '/dashboard/supporter',
    id: 'supporterDashboard',
    component: DashboardSupporterPage
  },
  {
    path: '/community/share',
    id: 'communityShare',
    component: CommunitySharePage
  },
  {
    path: '/event/share',
    id: 'communityShare',
    component: CommunitySharePage
  },
  {
    path: '/community/artist/:artistId/filter',
    id: 'communityArtistFilter',
    component: CommunityArtistFilterPage
  },
  {
    path: '/share',
    id: 'communityShare',
    component: CommunitySharePage
  },
  {
    path: '/radio/view-all',
    id: 'viewAllStations',
    component: ViewAllStationsPage
  },
  {
    path: '/artist/gateway/:artistId',
    id: 'ArtistGatewayPage',
    component: ArtistGatewayPage
  }
];
