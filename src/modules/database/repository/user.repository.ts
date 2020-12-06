import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserEntity } from '@modules/database/entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
