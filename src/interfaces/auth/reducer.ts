import { UserInterface, SignUpInterface } from "../";

export interface AuthReducerType {
    loggedUser: UserInterface | undefined;
    signUpUser: SignUpInterface;
  }