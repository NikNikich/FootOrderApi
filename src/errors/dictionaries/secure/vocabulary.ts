import { APIError } from '@errors/builder/ErrorBuilder';
import { HTTP_STATUSES } from '@errors/interfaces';
import { ISecureErrors } from './interfaces';

export const secureVocabulary: ISecureErrors = {
  AccessDenied: new APIError(
    HTTP_STATUSES.FORBIDDEN,
    'Access denied',
    800,
  ),
  TokenNotExist: new APIError(
    HTTP_STATUSES.UNAUTHORIZED,
    'Token not exist',
    801,
  ),
  TokenIsExpired: new APIError(
    HTTP_STATUSES.UNAUTHORIZED,
    'Token is expired',
    802,
  ),
  NotAuthorize: new APIError(
    HTTP_STATUSES.UNAUTHORIZED,
    'Not authorize',
    803,
  ),
  CodeTimeLifeOut: new APIError(
    HTTP_STATUSES.BAD,
    'Code is expired',
    804,
  ),
  PasswordsNotIdentical: new APIError(
    HTTP_STATUSES.BAD,
    "Passwords don't match. Please try again",
    805,
  ),
};
