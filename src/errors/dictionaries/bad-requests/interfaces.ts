import { APIError } from '@errors/builder/ErrorBuilder';

export interface IBadRequestErrors {
  UserAlreadyExist: APIError;
  EmailAlreadyUsed: APIError;
  FileUploadingError: APIError;
  NotSaveUserError: APIError;
  NotDownloadAvatarError: APIError;
}
