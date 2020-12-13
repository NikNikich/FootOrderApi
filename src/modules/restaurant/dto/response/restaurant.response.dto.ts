import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RestaurantResponseDto {
  @Expose()
  @ApiProperty({ description: 'name restaurant' })
  name!: string;

  @Expose()
  @ApiProperty({ description: 'user-address restaurant' })
  address?: string;

  @Expose()
  @ApiProperty({ description: 'phone restaurant' })
  phone?: string;
}
