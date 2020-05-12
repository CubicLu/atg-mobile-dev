import { PlanInterface } from '../interfaces';
import { Colors } from '../types';

export const plans: PlanInterface[] = [
  {
    name: 'Basic',
    price: '.69',
    color: Colors.lightBlue,
    id: 1,
    description:
      'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
  },
  {
    name: 'Premium',
    price: '.99',
    color: Colors.green,
    id: 2,
    description:
      'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
  }
];
