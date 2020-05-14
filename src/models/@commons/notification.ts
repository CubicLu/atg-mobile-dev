export interface NotificationInterface {
  readonly message: string;
  readonly sendAt: Date;
  readonly read: boolean;
  readonly subject: string;
  readonly name: string;
  readonly username: string;
  readonly image: string;
}
