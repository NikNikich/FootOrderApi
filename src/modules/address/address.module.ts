import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from '@modules/address/address.controller';
import { AddressRepository } from '@modules/address/repository/address.repository';
import { AddressService } from '@modules/address/address.service';

@Module({
  controllers: [AddressController],
  imports: [TypeOrmModule.forFeature([AddressRepository])],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
