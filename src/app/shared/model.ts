export enum Role {
  CUSTOMER,
  MERCHANT,
  ADMIN,
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
}

export interface  Address {
  street1: string;
  street2: string;
  street3: string;
  city: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  state: string;
  country: string;
}
