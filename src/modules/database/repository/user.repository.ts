import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserEntity } from '@modules/database/entity/user.entity';
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
    const user = await this.findOne(id);
    if (!user) {
      throw errors.UserNotFound;
    }
    return user;
  }
}
