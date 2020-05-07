import { MenuInterface } from '../../interfaces';
import {
  DashboardSupporterPage,
  DashboardRankingPage,
  DashboardAnalyticPage
} from '../../pages';
export const dashboardTabs: MenuInterface[] = [
  {
    id: 'wallet',
    label: 'Wallet',
    icon: 'w',
    isPage: true,
    route: '/dashboard/wallet'
  },
  {
    id: 'analytic',
    label: 'Analytic',
    icon: 'a',
    component: DashboardAnalyticPage
  },
  {
    id: 'supporter',
    label: 'Supporter',
    icon: 's',
    component: DashboardSupporterPage
  },
  {
    id: 'ranking',
    label: 'Ranking',
    icon: 'r',
    component: DashboardRankingPage
  }
];
