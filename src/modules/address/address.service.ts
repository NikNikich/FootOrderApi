import { Inject, Injectable } from '@nestjs/common';
import { AddressRepository } from '@modules/address/repository/address.repository';
import { AddressEntity } from '@modules/address/entity/address.entity';
import { DADATA_KEY } from '@modules/dadate/dadata.const';
import { DaDataService } from '@modules/dadate/dadate.service';
import { errors } from '@errors/errors';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository,
    @Inject(DADATA_KEY)
    private readonly daDataService: DaDataService,
  ) {}

  async findOne(addressId: number): Promise<AddressEntity> {
    return this.addressRepository.findByIdOrReject(addressId);
  }

  async setFavorite(addressId: number): Promise<AddressEntity> {
    const address = await this.findOne(addressId);
    address.isFavorite = true;
    return this.addressRepository.save(address);
  }

  async addUserAddress(
    userId: number,
    editAddress: string,
  ): Promise<AddressEntity> {
    const address = await this.daDataService.getGeoKodeAddress(
      editAddress,
    );
    if (!address || !address.result) {
      throw errors.NotIdentifiedAddress;
    }
    return this.addressRepository.addNewAddress(
      address.result,
      address.geo_lat,
      address.geo_lon,
      userId,
    );
  }
}
