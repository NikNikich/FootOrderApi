import { UserRoles } from '@modules/database/enum/role.enum';

export interface IUserPayloadParams {
  id: number;
  fullName?: string;
  email: string;
  roles: UserRoles[];
}
