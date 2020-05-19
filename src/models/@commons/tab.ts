export interface TabsInterface {
  readonly path: string;
  readonly icon: any;
  readonly id: TabId;
  readonly component: any;
}
export type TabId = 'discovery' | 'community' | 'profile' | 'search' | 'radio';
