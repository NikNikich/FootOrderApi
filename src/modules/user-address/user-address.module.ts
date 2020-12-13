import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressController } from '@modules/user-address/user-address.controller';
import { UserAddressRepository } from '@modules/user-address/repository/user-address.repository';
import { UserAddressService } from '@modules/user-address/user-address.service';

@Module({
  controllers: [UserAddressController],
  imports: [TypeOrmModule.forFeature([UserAddressRepository])],
  providers: [UserAddressService],
  exports: [UserAddressService],
})
export class UserAddressModule {}
