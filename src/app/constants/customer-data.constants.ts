import { Customer } from '../models/customer.model';

export const customers: Customer[] = [
  {
    firstName: 'Heather',
    lastName: 'Johnson',
    contactInfo: {
      address: 'McKinney, Texas',
      email: 'heather-johnson@email.com',
      phoneNumber: '222-222-2222',
    },
    cart: [],
  },
  {
    firstName: 'Curtis',
    lastName: 'McLaughlin',
    contactInfo: {
      address: 'Houston, Texas',
      email: 'curtis-mclaughlin@email.com',
      phoneNumber: '333-333-3333',
    },
    cart: [],
  },
  {
    firstName: 'Ben',
    lastName: 'Mauro',
    contactInfo: {
      address: 'Austin, Texas',
      email: 'ben-mauro@email.com',
      phoneNumber: '444-444-4444',
    },
    cart: [],
  },
];
