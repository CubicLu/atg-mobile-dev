export interface NotificationInterface extends UserInterface {
    message: string;
    sendAt: Date;
    read: boolean;
    subject: string;
  }