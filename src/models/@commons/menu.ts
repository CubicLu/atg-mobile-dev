export interface MenuInterface {
  label: string;
  icon: any;
  id: string;
  component?: any;
  isPage?: boolean;
  route?: string | null;
  onClick?: Function;
}
