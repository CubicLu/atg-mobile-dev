import { UserInterface, SignUpInterface } from '../';

export interface AuthReducerType {
  readonly loggedUser: UserInterface | undefined;
  readonly signUpUser: SignUpInterface;
}
