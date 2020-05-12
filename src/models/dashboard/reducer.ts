import { DashboardInterface } from './..';
import { Nullable } from './../../types';
export interface DashboardReducerType {
  readonly dashboard: Nullable<DashboardInterface>;
  readonly loading: boolean;
  readonly successMessage: Nullable<string>;
  readonly errorMessage: Nullable<string>;
}
