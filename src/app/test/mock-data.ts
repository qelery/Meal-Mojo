import {
  Address,
  MenuItem,
  OperatingHours,
  Order,
  OrderLine,
  Restaurant,
  Role,
  User,
} from '../shared/model';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../ngrx/reducers/auth.reducer';

export const mockAddress: Address = {
  street1: '5700 S Lake Shore Dr',
  city: 'Chicago',
  state: 'IL',
  zipcode: '60637',
  country: 'US',
  latitude: 41.7905726,
  longitude: -87.5830659,
};

export const mockUser: User = {
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Smith',
  address: null,
};

export const mockLoginRequest: LoginRequest = {
  username: 'john@example.com',
  password: 'pass123',
};

export const mockLoginResponse: LoginResponse = {
  token: '123abc',
  userInfo: mockUser,
};

export const mockRegisterRequest: RegisterRequest = {
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Smith',
  password: 'pass123',
  role: Role.CUSTOMER,
};

export const mockOperatingHoursList: OperatingHours[] = [
  {
    openTime: '08:00',
    closeTime: '20:00',
    dayOfWeek: 'Friday',
  },
  {
    openTime: '10:00',
    closeTime: '23:00',
    dayOfWeek: 'Saturday',
  },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: 22,
    name: 'Da Bears Burger',
    description: 'smoked brisket, chipotle cheddar sauce, pretzel bun',
    price: 16,
    imageUrl: 'image.jpg',
    isAvailable: true,
  },
  {
    id: 54,
    name: 'Southwestern Cobb Salad',
    description:
      'avocado, red onion, red pepper, hard-boiled egg, chipotle ranch',
    price: 7.5,
    imageUrl: 'image.jpg',
    isAvailable: true,
  },
  {
    id: 72,
    name: 'The Mad Wrapper',
    description:
      'turkey, bacon, avocado, arugula, pepper jack, spanish aioli, pita wrap',
    price: 12,
    imageUrl: 'image.jpg',
    isAvailable: false,
  },
];

export const mockOrderLines: OrderLine[] = [
  {
    id: 1035,
    quantity: 2,
    priceEach: mockMenuItems[0].price,
    menuItem: mockMenuItems[0],
  },
  {
    id: 1036,
    quantity: 3,
    priceEach: mockMenuItems[2].price,
    menuItem: mockMenuItems[2],
  },
  {
    id: 1037,
    quantity: 1,
    priceEach: mockMenuItems[1].price,
    menuItem: mockMenuItems[1],
  },
];

export const mockOrders: Order[] = [
  {
    id: 453,
    tip: 5.0,
    isCompleted: true,
    paymentMethod: 'CARD',
    orderLines: mockOrderLines,
    restaurantId: 456,
    restaurantName: 'The Bad Apple',
    restaurantLogoImageUrl: 'image.jpg',
    customerProfileFirstName: mockUser.firstName,
    customerProfileLastName: mockUser.lastName,
    customerProfileAddress: mockAddress,
  },
];

export const mockRestaurantList: Restaurant[] = [
  {
    id: 456,
    name: 'The Bad Apple',
    description:
      'Laid-back bar & restaurant with creative burgers and an extensive craft beer selection.',
    pickUpAvailable: true,
    pickUpEtaMinutes: 30,
    deliveryAvailable: true,
    deliveryEtaMinutes: 40,
    deliveryFee: 3.5,
    logoImageUrl: 'image.jpg',
    heroImageUrl: 'image.jpg',
    address: mockAddress,
    operatingHoursList: mockOperatingHoursList,
    menuItems: mockMenuItems,
    orders: mockOrders,
  },
];
