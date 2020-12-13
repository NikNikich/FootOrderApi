import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateResponseDto {
  @Expose()
  @ApiProperty({ description: 'Email user-address' })
  email: string;

  @Expose()
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @Expose()
  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;
}
