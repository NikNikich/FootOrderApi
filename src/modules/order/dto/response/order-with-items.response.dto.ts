import { OrderResponseDto } from '@modules/order/dto/response/order.response.dto';
import { Expose, Type } from 'class-transformer';
import { MenuItemPositionResponseDto } from '@modules/menu-item/dto/response/menu-item-position.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';

export class OrderWithItemsResponseDto extends OrderResponseDto {
  @Expose()
  @Type(() => MenuItemPositionResponseDto)
  @ApiProperty({
    type: MenuItemPositionResponseDto,
    description: 'order items',
    isArray: true,
  })
  menuItems?: MenuItemEntity[];
}
