import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '@modules/user-role/repository/user-role.repository';
import { UserRoleEntity } from '@modules/user-role/entity/user-role.entity';
import { UserRoles } from '@modules/user-role/enum/role.enum';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async create(
    userId: number,
    roles: UserRoles[],
  ): Promise<UserRoleEntity[]> {
    const rolesRecords = await Promise.all(
      (roles || []).map(
        (role: UserRoles) => new UserRoleEntity({ role, userId }),
      ),
    );
    return this.userRoleRepository.save(rolesRecords);
  }
}
