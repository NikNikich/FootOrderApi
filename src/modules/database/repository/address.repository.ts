import { EntityRepository } from 'typeorm';
import { AddressEntity } from '@modules/database/entity/address.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(AddressEntity)
export class AddressRepository extends BaseRepository<AddressEntity> {}
