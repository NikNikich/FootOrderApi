import { APIError } from '@errors/builder/ErrorBuilder';

export interface IInternalErrors {
  ControllerUnknown: APIError;
  MethodOfControllerUnknown: APIError;
  ExternalRequestUnknownType: APIError;
  DatabaseNotConnected: APIError;
  UnparsableSequelizeError: APIError;
  SequelizeError: APIError;
  UnsuccessfulUploadFile: APIError;
}
