import { UserResponseDto } from '@modules/user/dto/response/user.response.dto';
import { UserAddressEntity } from '@modules/user-address/entity/user-address.entity';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';
import { RestaurantResponseDto } from '@modules/restaurant/dto/response/restaurant.response.dto';
import { UserAddressResponseDto } from '@modules/user-address/dto/response/user-address.response.dto';

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
  @Type(() => UserAddressResponseDto)
  @ApiProperty({
    type: UserAddressResponseDto,
    description: 'user addresses',
    isArray: true,
    minLength: 1,
    maxLength: 10_000,
  })
  favoriteAddresses?: UserAddressEntity[];
}
