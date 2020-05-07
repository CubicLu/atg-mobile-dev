import { MenuInterface } from '../../interfaces';
import {
  DashboardAnalyticPage,
  DashboardWalletPage,
  DashboardRankingPage
} from '../../pages';
export const dashboardTabs: MenuInterface[] = [
  {
    id: 'wallet',
    label: 'Wallet',
    icon: 'w',
    component: DashboardWalletPage
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
    isPage: true,
    route: '/dashboard/supporter'
  },
  {
    id: 'ranking',
    label: 'Ranking',
    icon: 'r',
    component: DashboardRankingPage
  }
];
