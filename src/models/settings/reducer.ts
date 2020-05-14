import {
  TabsInterface,
  RouteInterface,
  MenuInterface,
  ModalSlideInterface,
  PlanInterface,
  SubEraInterface
} from '../';
import { Nullable } from './../../types';

export interface SettingsReducerType {
  readonly tabs: TabsInterface[];
  readonly activeTab: string;
  readonly routes: RouteInterface[];
  readonly fanTabs: MenuInterface[];
  readonly artistTabs: MenuInterface[];
  readonly modal: ModalSlideInterface;
  readonly popUpModal: Nullable<string>;
  readonly plans: PlanInterface[];
  readonly selectedPlan: Nullable<PlanInterface>;
  readonly activeDeepDiveTab: string;
  readonly deepDiveTabs: MenuInterface[];
  readonly messageTabs: MenuInterface[];
  readonly activeMessageTab: string;
  readonly activeFanTab: string;
  readonly activeProfileFriendTab: string;
  readonly profileFriendTabs: MenuInterface[];
  readonly selectContactTabs: MenuInterface[];
  readonly activeSelectContactTab: string;
  readonly eraFilters: object[];
  readonly activeDashboardTab: string;
  readonly dashboardTabs: MenuInterface[];
  readonly era: string;
  readonly subEra: SubEraInterface[];
  readonly genreFilters: object[];
  readonly selectedGenres: string[];
  readonly notifications: number;
  readonly settingsMenu: MenuInterface[];
  readonly showToast: boolean;
  readonly selectedEras: string[];
}
