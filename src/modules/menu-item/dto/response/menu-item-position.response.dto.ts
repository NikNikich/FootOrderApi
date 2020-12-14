import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MenuItemPositionResponseDto {
  @Expose()
  @ApiProperty({ description: 'Name position menu item' })
  name: string;

  @Expose()
  @ApiProperty({ description: 'Description position menu item' })
  description?: string;

  @Expose()
  @ApiProperty({ description: 'Price position menu item' })
  price?: number;
}
