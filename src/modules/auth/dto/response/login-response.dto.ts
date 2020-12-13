import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserProfileResponseDto } from '@modules/user/dto';

export class LoginResponseDto extends UserProfileResponseDto {
  @Expose()
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @Expose()
  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;
}
