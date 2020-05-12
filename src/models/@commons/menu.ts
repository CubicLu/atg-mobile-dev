export interface MenuInterface {
  readonly label: string;
  readonly icon: any;
  readonly id: string;
  readonly component?: any;
  readonly isPage?: boolean;
  readonly route?: string | null;
  readonly onClick?: Function;
}
