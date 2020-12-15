import { Expose, Type } from 'class-transformer';
import { RestaurantResponseDto } from '@modules/restaurant/dto/response/restaurant.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MenuItemResponseDto } from '@modules/menu-item/dto/response/menu-item.response.dto';

export class RestaurantMenuResponseDto extends RestaurantResponseDto {
  @Expose()
  @Type(() => MenuItemResponseDto)
  @ApiProperty({
    type: MenuItemResponseDto,
    description: 'menu restaurant',
    isArray: true,
  })
  menu?: MenuItemResponseDto[];
}
