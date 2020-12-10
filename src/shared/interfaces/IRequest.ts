import { IUserPayloadParams as IUserPayload } from '@modules/auth/type/IUserPayload';
import { Request } from 'express';

export interface IRequest extends Request {
  user: IUserPayload;
}
