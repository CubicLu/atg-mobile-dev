export interface MessageInterface {
  readonly message: string;
  readonly sendAt: Date;
  readonly read: boolean;
  readonly name: string;
  readonly username: string;
  readonly image: string;
}
