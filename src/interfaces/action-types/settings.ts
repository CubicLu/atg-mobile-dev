export interface SettingsReducerType {
  tabs: TabsInterface[];
  activeTab: string;
  routes: RouteInterface[];
  fanTabs: MenuInterface[];
  artistTabs: MenuInterface[];
  modal: ModalSlideInterface;
  popUpModal: string | null;
  plans: PlanInterface[];
  selectedPlan: PlanInterface | null;
  activeDeepDiveTab: string;
  deepDiveTabs: MenuInterface[];
  messageTabs: MenuInterface[];
  activeMessageTab: string;
  activeFanTab: string;
  activeProfileFriendTab: string;
  profileFriendTabs: MenuInterface[];
  selectContactTabs: MenuInterface[];
  activeSelectContactTab: string;
  eraFilters: object[];
  activeDashboardTab: string;
  dashboardTabs: MenuInterface[];
  era: string;
  subEra: SubEraInterface[];
  genreFilters: object[];
  selectedGenres: string[];
  notifications: number;
}
