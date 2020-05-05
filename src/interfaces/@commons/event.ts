export interface EventInterface {
    date: string | Date;
    where: string;
    name: string;
    city: string;
    whoIsGoing?: EventWhoIsGoingInterface[];
  }

  export interface EventWhoIsGoingInterface extends UserInterface {}
