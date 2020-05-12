import { UserInterface } from './../';
export interface EventInterface {
  readonly date: string | Date;
  readonly where: string;
  readonly name: string;
  readonly city: string;
  readonly whoIsGoing?: EventWhoIsGoingInterface[];
}

export interface EventWhoIsGoingInterface extends UserInterface {}
