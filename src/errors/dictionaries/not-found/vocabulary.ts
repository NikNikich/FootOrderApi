import { APIError } from '@errors/builder/ErrorBuilder';
import { HTTP_STATUSES } from '@errors/interfaces';
import { INotFoundRequestErrors } from './interfaces';

export const notFoundRequestVocabulary: INotFoundRequestErrors = {
  UserNotFound: new APIError(
    HTTP_STATUSES.NOT_FOUND,
    'User not found',
    1,
  ),
};
