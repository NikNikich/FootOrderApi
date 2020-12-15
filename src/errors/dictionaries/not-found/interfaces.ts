import { APIError } from '@errors/builder/ErrorBuilder';

export interface INotFoundRequestErrors {
  UserNotFound: APIError;
  AddressNotFound: APIError;
  RestaurantNotFound: APIError;
}
