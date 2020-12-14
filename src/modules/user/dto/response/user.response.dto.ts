import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDto } from '@shared/dto';
import { Expose, Type } from 'class-transformer';
import { AddressResponseDto } from '@modules/address/dto/response/address.response.dto';
import { AddressEntity } from '@modules/address/entity/address.entity';

export class UserResponseDto extends ConstructableDto {
  @Expose()
  @ApiProperty({ description: 'User name' })
  fullName?: string;

  @Expose()
  @ApiProperty({ description: 'Email address' })
  email: string;

  @Expose()
  @ApiProperty({ description: 'Avatar user' })
  avatar?: string;

  @Expose()
  @Type(() => AddressResponseDto)
  @ApiProperty({
    type: AddressResponseDto,
    description: 'user addresses',
    isArray: true,
  })
  addresses?: AddressEntity[];
}
