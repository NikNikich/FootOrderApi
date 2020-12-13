import { IUserPayloadParams as IUserPayload } from '@modules/auth/interface/IUserPayload';
import { Request } from 'express';

export interface IRequest extends Request {
  user: IUserPayload;
}
