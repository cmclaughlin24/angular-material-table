export interface Customer {
  firstName: string;
  lastName: string;
  contactInfo: {
    address: string;
    email: string;
    phoneNumber: string;
  };
  cart: any[];
}
