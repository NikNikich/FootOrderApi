import { Injectable } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import { AddressRepository } from '@modules/address/repository/address.repository';
import { AddressEntity } from '@modules/address/entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    private readonly configService: ConfigService,
    private readonly addressRepository: AddressRepository,
  ) {}

  async findOne(addressId: number): Promise<AddressEntity> {
    return this.addressRepository.findByIdOrReject(addressId);
  }

  async setFavorite(addressId: number): Promise<AddressEntity> {
    const address = await this.findOne(addressId);
    address.isFavorite = true;
    return this.addressRepository.save(address);
  }
}
