import { UserRoles } from '@modules/user-role/enum/role.enum';

export interface IUserPayloadParams {
  id: number;
  fullName?: string;
  email: string;
  roles: UserRoles[];
}

export interface IUserCreateParams {
  password: string;
  email: string;
  roles: UserRoles[];
}
