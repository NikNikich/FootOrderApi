import { APIError } from '@errors/builder/ErrorBuilder';
import { HttpStatuses } from '@errors/interfaces';
import { IInternalErrors } from './interfaces';

export const internalVocabulary: IInternalErrors = {
  ControllerUnknown: new APIError(
    HttpStatuses.INTERNAL,
    'RIController of route is unknown',
    501,
  ),
  MethodOfControllerUnknown: new APIError(
    HttpStatuses.INTERNAL,
    'Method of route is unknown',
    502,
  ),
  ExternalRequestUnknownType: new APIError(
    HttpStatuses.INTERNAL,
    'Type of external request is unknown',
    503,
  ),
  DatabaseNotConnected: new APIError(
    HttpStatuses.INTERNAL,
    "Database didn't connect",
    504,
  ),
  UnparsableSequelizeError: new APIError(
    HttpStatuses.INTERNAL,
    'Unexpected DB error',
    505,
  ),
  SequelizeError: new APIError(
    HttpStatuses.INTERNAL,
    'The Sequelize Error',
    506,
  ),
  UnsuccessfulUploadFile: new APIError(
    HttpStatuses.INTERNAL,
    'Unsuccessful upload file',
    507,
  ),
};
