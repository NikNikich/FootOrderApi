import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
  @Expose()
  @ApiProperty({ description: 'Email address in text' })
  name: string;

  @Expose()
  @ApiProperty({ description: 'Address latitude' })
  latitude: number;

  @Expose()
  @ApiProperty({ description: 'Address longitude' })
  longitude: number;
}
