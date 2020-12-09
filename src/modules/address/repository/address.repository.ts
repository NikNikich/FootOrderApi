import { EntityRepository } from 'typeorm';
import { AddressEntity } from '@modules/address/entity/address.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(AddressEntity)
export class AddressRepository extends BaseRepository<AddressEntity> {}
