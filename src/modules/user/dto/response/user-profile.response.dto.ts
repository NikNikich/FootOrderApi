import { UserResponseDto } from '@modules/user/dto/response/user.response.dto';
import { AddressEntity } from '@modules/address/entity/address.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';

export class UserProfileResponseDto extends UserResponseDto {
  @Expose()
  @ApiProperty({ description: 'selected restaurants' })
  restaurants?: RestaurantEntity[];

  @Expose()
  @ApiProperty({ description: 'user addresses' })
  addresses?: AddressEntity[];
}
