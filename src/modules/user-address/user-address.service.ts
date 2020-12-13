import { Injectable } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import { UserAddressRepository } from '@modules/user-address/repository/user-address.repository';
import { UserAddressEntity } from '@modules/user-address/entity/user-address.entity';

@Injectable()
export class UserAddressService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userAddressRepository: UserAddressRepository,
  ) {}

  async findOne(addressId: number): Promise<UserAddressEntity> {
    return this.userAddressRepository.findByIdOrReject(addressId);
  }

  async setFavorite(addressId: number): Promise<UserAddressEntity> {
    const address = await this.findOne(addressId);
    address.isFavorite = true;
    return this.userAddressRepository.save(address);
  }
}
