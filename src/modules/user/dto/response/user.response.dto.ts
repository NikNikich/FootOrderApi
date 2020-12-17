import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AddressResponseDto } from '@modules/address/dto/response/address.response.dto';
import { AddressEntity } from '@modules/address/entity/address.entity';
import { UserWithoutAddressResponseDto } from '@modules/user/dto/response/user-without-address.response.dto';

export class UserResponseDto extends UserWithoutAddressResponseDto {
  @Expose()
  @Type(() => AddressResponseDto)
  @ApiProperty({
    type: AddressResponseDto,
    description: 'user addresses',
    isArray: true,
  })
  addresses?: AddressEntity[];
}
