import { APIError } from '@errors/builder/ErrorBuilder';
import { HttpStatuses } from '@errors/interfaces';
import { INotFoundRequestErrors } from './interfaces';

export const notFoundRequestVocabulary: INotFoundRequestErrors = {
  UserNotFound: new APIError(
    HttpStatuses.NOT_FOUND,
    'User not found',
    1,
  ),

  AddressNotFound: new APIError(
    HttpStatuses.NOT_FOUND,
    'Address not found',
    2,
  ),

  RestaurantNotFound: new APIError(
    HttpStatuses.NOT_FOUND,
    'Restaurant not found',
    3,
  ),

  MenuItemNotFound: new APIError(
    HttpStatuses.NOT_FOUND,
    'Menu item not found',
    4,
  ),

  OrderNotFound: new APIError(
    HttpStatuses.NOT_FOUND,
    'Menu item not found',
    5,
  ),
};
