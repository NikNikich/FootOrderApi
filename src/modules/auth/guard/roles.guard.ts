import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { intersection } from 'lodash';
import { UserRoles } from '@modules/user-role/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const methodRoles =
      this.reflector.get<UserRoles[]>(
        'roles',
        context.getHandler(),
      ) ?? [];
    const classRoles =
      this.reflector.get<UserRoles[]>('roles', context.getClass()) ??
      [];
    const roles = [...methodRoles, ...classRoles];
    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user || !user.roles) {
      return false;
    }
    return intersection(roles, user.roles).length === roles.length;
  }
}
