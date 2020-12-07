import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/database/repository/user.repository';
import { UserRoleRepository } from '@modules/database/repository/user-role.repository';
import { UserEntity } from '@modules/database/entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
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
}
