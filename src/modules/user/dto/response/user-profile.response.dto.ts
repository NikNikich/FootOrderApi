import { UserResponseDto } from '@modules/user/dto/response/user.response.dto';
import { AddressEntity } from '@modules/address/entity/address.entity';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';
import { RestaurantResponseDto } from '@modules/restaurant/dto/response/restaurant.response.dto';
import { AddressResponseDto } from '@modules/address/dto/response/address.response.dto';

export class UserProfileResponseDto extends UserResponseDto {
  @Expose()
  @Type(() => RestaurantResponseDto)
  @ApiProperty({
    type: RestaurantResponseDto,
    description: 'selected restaurants',
    isArray: true,
    minLength: 1,
    maxLength: 10_000,
  })
  selectedRestaurants?: RestaurantEntity[];

  @Expose()
  @Type(() => AddressResponseDto)
  @ApiProperty({
    type: AddressResponseDto,
    description: 'favorite user addresses',
    isArray: true,
    minLength: 1,
    maxLength: 10_000,
  })
  favoriteAddresses?: AddressEntity[];
}
