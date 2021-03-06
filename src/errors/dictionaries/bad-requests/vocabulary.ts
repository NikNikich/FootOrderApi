import { APIError } from '@errors/builder/ErrorBuilder';
import { HttpStatuses } from '@errors/interfaces';
import { IBadRequestErrors } from './interfaces';

export const badRequestVocabulary: IBadRequestErrors = {
  UserAlreadyExist: new APIError(
    HttpStatuses.BAD,
    'User is already exist',
    101,
  ),
  EmailAlreadyUsed: new APIError(
    HttpStatuses.BAD,
    'This email address is already being used',
    102,
  ),
  FileUploadingError: new APIError(
    HttpStatuses.BAD,
    'File not uploaded successfully.',
    103,
  ),
  NotSaveUserError: new APIError(
    HttpStatuses.BAD,
    'User not save successfully.',
    104,
  ),
  NotDownloadAvatarError: new APIError(
    HttpStatuses.BAD,
    'Avatar not download successfully.',
    105,
  ),
  NotIdentifiedAddress: new APIError(
    HttpStatuses.BAD,
    'Address not identified.',
    106,
  ),

  MenuAnotherRestaurant: new APIError(
    HttpStatuses.BAD,
    'Menu from another restaurant.',
    107,
  ),

  OrderAnotherUser: new APIError(
    HttpStatuses.BAD,
    'Order from another user.',
    108,
  ),

  CannotChangeOrder: new APIError(
    HttpStatuses.BAD,
    "Can't change order.",
    109,
  ),
};
