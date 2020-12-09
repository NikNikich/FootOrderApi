import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guard/roles.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AllowRoles } from '@shared/decorators/Roles';
import { UserRoles } from '@modules/user-role/enum/role.enum';

export function Auth(roles: UserRoles[] = [UserRoles.USER]): any {
  return applyDecorators(
    AllowRoles(roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
}
