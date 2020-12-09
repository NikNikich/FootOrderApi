import { APIError } from '@errors/builder/ErrorBuilder';
import { HttpStatuses } from '@errors/interfaces';
import { ISecureErrors } from './interfaces';

export const secureVocabulary: ISecureErrors = {
  AccessDenied: new APIError(
    HttpStatuses.FORBIDDEN,
    'Access denied',
    800,
  ),
  TokenNotExist: new APIError(
    HttpStatuses.UNAUTHORIZED,
    'Token not exist',
    801,
  ),
  TokenIsExpired: new APIError(
    HttpStatuses.UNAUTHORIZED,
    'Token is expired',
    802,
  ),
  NotAuthorize: new APIError(
    HttpStatuses.UNAUTHORIZED,
    'Not authorize',
    803,
  ),
  CodeTimeLifeOut: new APIError(
    HttpStatuses.BAD,
    'Code is expired',
    804,
  ),
  PasswordsNotIdentical: new APIError(
    HttpStatuses.BAD,
    "Passwords don't match. Please try again",
    805,
  ),
};
