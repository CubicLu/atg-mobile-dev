import { RouteInterface } from './../models';
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
  VaultFilterPage,
  VaultFilterGenrePage,
  VaultFilterEraPage,
  VaultFilterSubEraPage,
  DashboardMenuPage,
  FeedPage,
  CommunitySharePage,
  CommunityArtistFilterPage,
  ChatPage,
  DashboardFilterPage,
  DashboardGraphSalesPage,
  DashboardGraphSupporterPage,
  CommunityArtistDripsPage,
  FriendProfilePage,
  WizardPage,
  ViewAllStationsPage
} from '../pages';

export const routes: RouteInterface[] = [
  //PROFILE
  {
    path: '/',
    id: 'profilePageInitial',
    component: ProfilePage,
    parentTab: 'profile'
  },
  {
    path: '/profile',
    id: 'fanProfile',
    component: ProfilePage,
    parentTab: 'profile'
  },
  {
    path: '/profile/friend/:id',
    id: 'friendProfile',
    component: FriendProfilePage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id',
    id: 'artistPage',
    component: ArtistPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/tab/:tab',
    id: 'artistPageAlbum',
    component: ArtistPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/support',
    id: 'artistSupport',
    component: ArtistSupportPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/thank-you',
    id: 'thankYou',
    component: ThankYouPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/gallery/:galleryId/image/:imageId',
    id: 'profileGallery',
    component: ArtistGalleryPhotoPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/gallery/:galleryId',
    id: 'profileGalleryGrid',
    component: ArtistGalleryGridPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/deep-dive',
    id: 'artistDeepDive',
    component: ArtistDeepDivePage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/event/:eventId',
    id: 'artistEvent',
    component: ArtistEventDetailPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/gallery',
    id: 'artistGallery',
    component: ArtistGalleryPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/biography',
    id: 'artistBiography',
    component: ArtistBiographyPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/event',
    id: 'artistEvents',
    component: ArtistEventsPage,
    parentTab: 'profile'
  },
  {
    path: '/track/:reference/:referenceId/:id',
    id: 'tracklist',
    component: TrackListPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/video/:videoId',
    id: 'artistVideo',
    component: ArtistVideoDetailPage,
    parentTab: 'profile'
  },
  {
    path: '/artist/:id/video',
    id: 'artistVideos',
    component: ArtistVideosPage,
    parentTab: 'profile'
  },
  {
    path: '/message/notification/:id',
    id: 'message-notification',
    component: MessageNotificationDetailPage,
    parentTab: 'profile'
  },
  {
    path: '/message/chat/new',
    id: 'message-chat-new',
    component: MessageSelectContactPage,
    parentTab: 'profile'
  },
  {
    path: '/message/chat/:id',
    id: 'message-chat-by-id',
    component: MessageSelectContactPage,
    parentTab: 'profile'
  },
  {
    path: '/message/select-contact',
    id: 'message-select-contact',
    component: MessageSelectContactPage,
    parentTab: 'profile'
  },
  {
    path: '/message',
    id: 'message',
    component: MessagePage,
    parentTab: 'profile'
  },
  {
    path: '/chat/:id',
    id: 'chat',
    component: ChatPage,
    parentTab: 'profile'
  },
  {
    path: '/profile/settings',
    id: 'settings',
    component: SettingsPage,
    parentTab: 'profile'
  },
  {
    path: '/profile/wizard',
    id: 'wizard',
    component: WizardPage,
    parentTab: 'profile'
  },
  {
    path: '/vault-filter',
    id: 'vault-filter',
    component: VaultFilterPage,
    parentTab: 'profile'
  },
  {
    path: '/vault-filter/genre',
    id: 'vault-filter-genre',
    component: VaultFilterGenrePage,
    parentTab: 'profile'
  },
  {
    path: '/vault-filter/era',
    id: 'vault-filter-era',
    component: VaultFilterEraPage,
    parentTab: 'profile'
  },
  {
    path: '/vault-filter/era/sub-era',
    id: 'vault-filter-sub-era',
    component: VaultFilterSubEraPage,
    parentTab: 'profile'
  },
  {
    path: '/dashboard/menu/:artistId',
    id: 'artistDashboardMenu',
    component: DashboardMenuPage,
    parentTab: 'profile'
  },
  {
    path: '/dashboard/:artistId',
    id: 'artistDashboard',
    component: DashboardPage,
    parentTab: 'profile'
  },
  {
    path: '/dashboard/:artistId/sales',
    id: 'analyticDetailDashboard',
    component: DashboardGraphSalesPage,
    parentTab: 'profile'
  },
  {
    path: '/dashboard/filter',
    id: 'filterDashboard',
    component: DashboardFilterPage,
    parentTab: 'profile'
  },
  {
    path: '/dashboard/:artistId/supporter',
    id: 'supporterDashboard',
    component: DashboardGraphSupporterPage,
    parentTab: 'profile'
  },
  {
    path: '/share',
    id: 'communityShare',
    component: CommunitySharePage,
    parentTab: 'profile'
  },

  //COMMUNITY
  {
    path: '/community',
    id: 'community',
    component: CommunityPage,
    parentTab: 'community'
  },
  {
    path: '/community/feed/:id',
    id: 'feedFanPage',
    component: FeedPage,
    parentTab: 'community'
  },
  {
    path: '/community/artist/:artistId/daily-drip',
    id: 'communityArtistDrip',
    component: CommunityArtistDripsPage,
    parentTab: 'community'
  },
  {
    path: '/daily-drip/:id',
    id: 'communityArtistDailyDrip',
    component: CommunityDailyDripPage,
    parentTab: 'community'
  },
  {
    path: '/community/artist',
    id: 'communityArtistList',
    component: CommunityAllArtistsPage,
    parentTab: 'community'
  },
  {
    path: '/community/artist/:artistId',
    id: 'communityArtist',
    component: CommunityArtistPage,
    parentTab: 'community'
  },
  {
    path: '/community/post',
    id: 'communityPost',
    component: CommunityNewPostPage,
    parentTab: 'community'
  },
  {
    path: '/community/comments/:id',
    id: 'communityComments',
    component: CommunityPostPage,
    parentTab: 'community'
  },
  {
    path: '/community/fan-feed-filter',
    id: 'fan-feed-filter',
    component: FanFeedFilterPage,
    parentTab: 'community'
  },
  {
    path: '/community/artist/:artistId/filter',
    id: 'communityArtistFilter',
    component: CommunityArtistFilterPage,
    parentTab: 'community'
  },

  //RADIO
  {
    path: '/radio/filter',
    id: 'radioFilter',
    component: RadioFilterPage,
    parentTab: 'radio'
  },
  {
    path: '/radio/station/edit/:id',
    id: 'radioStationEdit',
    component: RadioStationEditPage,
    parentTab: 'radio'
  },
  {
    path: '/radio/station/create',
    id: 'radioStationCreate',
    component: RadioStationEditPage,
    parentTab: 'radio'
  },
  {
    path: '/radio/genre/:genre',
    id: 'radioGenre',
    component: RadioPage,
    parentTab: 'radio'
  },
  {
    path: '/radio/artist/:id',
    id: 'radioArtist',
    component: RadioArtistPage,
    parentTab: 'radio'
  },
  {
    path: '/radio/:id/history',
    id: 'radioHistory',
    component: RadioHistoryPage,
    parentTab: 'radio'
  },
  {
    path: '/radio/view-all/',
    id: 'viewAllStations',
    component: ViewAllStationsPage,
    parentTab: 'radio'
  }
];
