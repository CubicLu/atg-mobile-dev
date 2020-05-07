import { Colors } from '../../types';

export interface PlanInterface {
  price: number | string;
  name: string;
  color: Colors;
  id: string | number;
  description: string;
}
