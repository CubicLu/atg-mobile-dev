import { PlanInterface } from '../interfaces';
import { Colors } from '../types';

export const plans: PlanInterface[] = [
  {
    name: 'Basic',
    price: '0.69',
    color: Colors.orange,
    id: 1,
    description:
      'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
  },
  {
    name: 'Platinum',
    price: '0.89',
    color: Colors.tertiary,
    id: 3,
    description:
      'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
  },
  {
    name: 'Gold',
    price: '0.79',
    color: Colors.lightBlue,
    id: 2,
    description:
      'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
  },
  {
    name: 'Diamond',
    price: '0.99',
    color: Colors.green,
    id: 4,
    description:
      'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
  }
];
