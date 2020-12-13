import { EntityRepository } from 'typeorm';
import { UserAddressEntity } from '@modules/user-address/entity/user-address.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { errors } from '@errors/errors';

@EntityRepository(UserAddressEntity)
export class UserAddressRepository extends BaseRepository<UserAddressEntity> {
  async findByIdOrReject(id: number): Promise<UserAddressEntity> {
    const address = await this.findOne(id);
    if (!address) {
      throw errors.AddressNotFound;
    }
    return address;
  }
}
