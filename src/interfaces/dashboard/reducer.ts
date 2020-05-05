export interface DashboardReducerType {
    dashboard: DashboardInterface | null;
    loading: boolean;
    successMessage: string | null;
    errorMessage: string | null;
  }