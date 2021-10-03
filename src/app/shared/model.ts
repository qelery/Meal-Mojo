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
}

export interface OperatingHours {
  openTime: string;
  closeTime: string;
  dayOfWeek: DayOfWeek;
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

export interface GoogleGeocoderResponse {
  results: GoogleGeocoderResult[];
  status: GoogleGeocoderStatus;
}

interface GoogleGeocoderResult {
  address_components: GoogleGeocoderAddressComponent[];
  formatted_address: string;
  geometry: GoogleGeocoderGeometry;
  partial_match?: boolean | undefined;
  place_id: string;
  plus_code?: GoogleGeocoderPlacePlusCode | undefined;
  postcode_localities?: string[] | undefined;
  types: string[];
}

interface GoogleGeocoderAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleGeocoderGeometry {
  location: {
    lat: number;
    lng: number;
  };
  location_type: string;
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
}

interface GoogleGeocoderPlacePlusCode {
  compound_code?: string | undefined;
  global_code: string;
}

type GoogleGeocoderStatus =
  | 'ERROR'
  | 'INVALID_REQUEST'
  | 'OK'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'UNKNOWN_ERROR'
  | 'ZERO_RESULTS';
