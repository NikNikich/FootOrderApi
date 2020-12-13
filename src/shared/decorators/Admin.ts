import { CustomDecorator } from '@nestjs/common';
import { UserRoles } from '@modules/user-role/enum/role.enum';
import { AllowRoles } from './Roles';

export const Admin = (): CustomDecorator =>
  AllowRoles([UserRoles.ADMIN]);
