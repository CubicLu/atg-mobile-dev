import { MenuInterface } from '../../models';
import {
  DashboardAnalyticPage,
  DashboardWalletPage,
  DashboardRankingPage,
  DashboardSupporterPage
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
    component: DashboardSupporterPage
  },
  {
    id: 'ranking',
    label: 'Ranking',
    icon: 'r',
    component: DashboardRankingPage
  }
];
