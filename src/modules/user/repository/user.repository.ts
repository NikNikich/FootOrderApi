import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserEntity } from '@modules/user/entity/user.entity';
import { errors } from '@errors/errors';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  async findByEmailOrReject(email: string): Promise<UserEntity> {
    const user = await this.findOne({
      where: { email },
      relations: ['roles'],
    });
    if (!user) {
      throw errors.UserNotFound;
    }
    return user;
  }

  async findByIdOrReject(id: number): Promise<UserEntity> {
    const user = await this.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw errors.UserNotFound;
    }
    return user;
  }

  async checkEmailUsage(
    email: string,
    userId?: number,
  ): Promise<void> {
    const userByEmail = await this.findOne({ email });
    if (userByEmail && (!userId || userByEmail.id !== userId)) {
      throw errors.EmailAlreadyUsed;
    }
  }
}
