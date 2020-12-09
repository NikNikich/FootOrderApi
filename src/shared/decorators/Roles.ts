import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRoles } from '@modules/user-role/enum/role.enum';

export const AllowRoles = (roles: UserRoles[]): CustomDecorator =>
  SetMetadata('roles', roles);
