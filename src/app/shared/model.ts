export enum Role {
  CUSTOMER = 'CUSTOMER',
  MERCHANT = 'MERCHANT',
  ADMIN = 'ADMIN',
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
}

export interface Address {
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

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  pickUpAvailable: boolean;
  pickUpEtaMinutes: number;
  deliveryAvailable: boolean;
  deliveryEtaMinutes: number;
  deliveryFee: number;
  logoImageUrl: string;
  heroImageUrl: string;
  address: Address;
  operatingHoursList: OperatingHours[];
  menuItems: MenuItem[];
  orders: Order[];
  cuisines: Cuisine[];
}

export interface OperatingHours {
  openTime: string;
  closeTime: string;
  dayOfWeek: DayOfWeek;
}

export interface Cuisine {
  category: string;
  priority: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

export interface Order {
  id: number;
  tip: number;
  isCompleted: boolean;
  paymentMethod: string;
  orderLines: OrderLine[];
  restaurantId: number;
  restaurantName: string;
  restaurantLogoImageUrl: string;
  customerProfileFirstName: string;
  customerProfileLastName: string;
  customerProfileAddress: Address;
}

export interface OrderLine {
  id: number;
  quantity: number;
  priceEach: number;
  menuItem: MenuItem;
}

export type DayOfWeek =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type GooglePlaceResult = google.maps.places.PlaceResult;
export type GoogleGeocoderAddressComponent = google.maps.GeocoderAddressComponent;
export type GoogleAutocomplete = google.maps.places.Autocomplete;
