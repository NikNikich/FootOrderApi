import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDto } from '@shared/dto';

export class UserAddAddressDto extends ConstructableDto<UserAddAddressDto> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'new address' })
  address: string;
}
