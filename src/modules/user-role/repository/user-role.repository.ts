import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserRoleEntity } from '@modules/user-role/entity/user-role.entity';

@EntityRepository(UserRoleEntity)
export class UserRoleRepository extends BaseRepository<UserRoleEntity> {}
