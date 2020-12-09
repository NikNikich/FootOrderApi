import { APIError } from '@errors/builder/ErrorBuilder';
import { HttpStatuses } from '@errors/interfaces';
import { IBadRequestErrors } from './interfaces';

export const badRequestVocabulary: IBadRequestErrors = {
  UserAlreadyExist: new APIError(
    HttpStatuses.BAD,
    'User is already exist',
    1,
  ),
  EmailAlreadyUsed: new APIError(
    HttpStatuses.BAD,
    'This email address is already being used',
    2,
  ),
};
