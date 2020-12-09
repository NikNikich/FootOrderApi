import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/user/repository/user.repository';
import { UserRoleRepository } from '@modules/user-role/repository/user-role.repository';
import { UserEntity } from '@modules/user/entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { IUserCreateParams } from '@modules/auth/type/IUserPayload';
import { UserRoleEntity } from '@modules/user-role/entity/user-role.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByEmailOrReject(email);
  }

  async findOne(userId: number): Promise<UserEntity> {
    return this.userRepository.findByIdOrReject(userId);
  }

  validatePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async create(params: IUserCreateParams): Promise<UserEntity> {
    const { password, roles, email } = params;
    await this.userRepository.checkEmailUsage(email);
    const hash = this.hashPassword(password);
    const userRecord = new UserEntity({
      email,
      password: hash,
    });
    const result = await this.userRepository.save(userRecord);
    const userId = result.id;
    const rolesRecords = (roles || []).map(
      (role) => new UserRoleEntity({ role, userId }),
    );
    result.roles = await this.userRoleRepository.save(rolesRecords);
    return result;
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
}
