import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '@modules/address/repository/address.repository';
import { AddressService } from '@modules/address/address.service';
import { DaDataModule } from '@modules/dadate/dadata.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressRepository]),
    DaDataModule.forRootAsync(),
  ],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
