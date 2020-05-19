import { TabId } from './tab';

export interface RouteInterface {
  readonly path: string;
  readonly icon?: any;
  readonly id: string;
  readonly component?: any;
  readonly parentTab: TabId;
}
