export interface UserInterface {
  readonly name: string;
  readonly fullname?: string;
  readonly email?: string;
  readonly avatar?: string | undefined;
  readonly username: string;
  readonly isFriend?: boolean;
  readonly id?: number;
}
