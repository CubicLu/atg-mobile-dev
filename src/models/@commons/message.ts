import { UserInterface } from './';

export interface MessageInterface extends UserInterface {
  readonly message: string;
  readonly sendAt: Date;
  readonly read: boolean;
}
