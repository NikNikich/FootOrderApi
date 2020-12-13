import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAddAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'new address' })
  address: string;
}
