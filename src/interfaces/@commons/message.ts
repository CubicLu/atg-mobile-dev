import { UserInterface } from "./";

export interface MessageInterface extends UserInterface {
    message: string;
    sendAt: Date;
    read: boolean;
  }