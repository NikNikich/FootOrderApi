import { APIError } from '@errors/builder/ErrorBuilder';
import { HTTP_STATUSES } from '@errors/interfaces';
import { IBadRequestErrors } from './interfaces';

export const badRequestVocabulary: IBadRequestErrors = {
  UserAlreadyExist: new APIError(
    HTTP_STATUSES.BAD,
    'User is already exist',
    1,
  ),
  EmailAlreadyUsed: new APIError(
    HTTP_STATUSES.BAD,
    'This email address is already being used',
    2,
  ),
};
