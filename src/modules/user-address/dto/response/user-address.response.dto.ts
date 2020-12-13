import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserAddressResponseDto {
  @Expose()
  @ApiProperty({ description: 'Email user-address' })
  address: string;
}
