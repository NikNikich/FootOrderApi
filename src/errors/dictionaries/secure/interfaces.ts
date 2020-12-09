import { APIError } from '@errors/builder/ErrorBuilder';

export interface ISecureErrors {
  AccessDenied: APIError;
  TokenNotExist: APIError;
  TokenIsExpired: APIError;
  NotAuthorize: APIError;
  CodeTimeLifeOut: APIError;
  PasswordsNotIdentical: APIError;
}
