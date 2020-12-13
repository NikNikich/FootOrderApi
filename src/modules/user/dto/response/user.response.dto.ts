import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class UserResponseDto extends ConstructableDto {
  @Expose()
  @ApiProperty({ description: 'User name' })
  fullName?: string;

  @Expose()
  @ApiProperty({ description: 'Email address' })
  email: string;

  @Expose()
  @ApiProperty({ description: 'Avatar user' })
  avatar?: string;
}
