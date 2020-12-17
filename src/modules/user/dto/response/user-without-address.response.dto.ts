import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDto } from '@shared/dto';

export class UserWithoutAddressResponseDto extends ConstructableDto<UserWithoutAddressResponseDto> {
  @Expose()
  @ApiProperty({ description: 'User name' })
  fullName?: string;

  @Expose()
  @ApiProperty({ description: 'Email address' })
  email!: string;

  @Expose()
  @ApiProperty({ description: 'Avatar user' })
  avatar?: string;
}
