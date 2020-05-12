import { UserInterface } from './../';

export interface NotificationInterface extends UserInterface {
  readonly message: string;
  readonly sendAt: Date;
  readonly read: boolean;
  readonly subject: string;
}
