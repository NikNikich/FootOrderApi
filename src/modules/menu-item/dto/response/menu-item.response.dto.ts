import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MenuItemPositionResponseDto } from '@modules/menu-item/dto/response/menu-item-position.response.dto';

export class MenuItemResponseDto {
  @Expose()
  @ApiProperty({ description: 'Name category menu item' })
  category: string;

  @Expose()
  @Type(() => MenuItemPositionResponseDto)
  @ApiProperty({
    type: MenuItemPositionResponseDto,
    description: 'Position category menu item',
    isArray: true,
  })
  positions: MenuItemPositionResponseDto[];
}
