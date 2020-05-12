import { Colors } from '../../types';

export interface PlanInterface {
  readonly price: number | string;
  readonly name: string;
  readonly color: Colors;
  readonly id: string | number;
  readonly description: string;
}
