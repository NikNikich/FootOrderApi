import { EntityRepository } from 'typeorm';
import { AddressEntity } from '@modules/address/entity/address.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { errors } from '@errors/errors';

@EntityRepository(AddressEntity)
export class AddressRepository extends BaseRepository<AddressEntity> {
  async findByIdOrReject(id: number): Promise<AddressEntity> {
    const address = await this.findOne(id);
    if (!address) {
      throw errors.AddressNotFound;
    }
    return address;
  }

  async addNewAddress(
    name: string,
    latitude: number,
    longitude: number,
    userId: number = null,
  ): Promise<AddressEntity> {
    const newAddress = new AddressEntity({
      name,
      latitude,
      longitude,
      userId,
    });
    return this.save(newAddress);
  }
}
