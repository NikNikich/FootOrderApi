import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AddressResponseDto } from '@modules/address/dto/response/address.response.dto';
import { MenuItemPositionResponseDto } from '@modules/menu-item/dto/response/menu-item-position.response.dto';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';
import { UserWithoutAddressResponseDto } from '@modules/user/dto/response/user-without-address.response.dto';
import { RestaurantResponseDto } from '@modules/restaurant/dto/response/restaurant.response.dto';

export class OrderResponseDto {
  @Expose()
  @ApiProperty({ description: 'Name order' })
  name!: string;

  @Expose()
  @ApiProperty({ description: 'Price order' })
  price!: number;

  @Expose()
  @ApiProperty({ description: 'Description order' })
  description?: string;

  @Expose()
  @ApiProperty({
    type: UserWithoutAddressResponseDto,
    description: 'User order',
  })
  user!: UserWithoutAddressResponseDto;

  @Expose()
  @ApiProperty({
    type: AddressResponseDto,
    description: 'Address order',
  })
  addressId!: AddressResponseDto;

  @Expose()
  @ApiProperty({
    type: RestaurantResponseDto,
    description: 'Restaurant order',
  })
  restaurantId!: RestaurantResponseDto;

  @Expose()
  @Type(() => MenuItemPositionResponseDto)
  @ApiProperty({
    type: MenuItemPositionResponseDto,
    description: 'order items',
    isArray: true,
  })
  menuItems?: MenuItemEntity[];
}
