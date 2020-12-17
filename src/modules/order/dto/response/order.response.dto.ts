import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AddressResponseDto } from '@modules/address/dto/response/address.response.dto';
import { RestaurantResponseDto } from '@modules/restaurant/dto/response/restaurant.response.dto';
import { OrderStatuses } from '@modules/order/enum/order-status.enum';

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
    description: 'Order status',
    enum: OrderStatuses,
    enumName: 'order status',
  })
  status: OrderStatuses;

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
}
