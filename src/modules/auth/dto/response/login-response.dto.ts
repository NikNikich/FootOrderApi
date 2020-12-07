import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '@modules/database/enum/role.enum';

export class LoginResponseDto {
  @ApiProperty({ description: 'Идентификатор' })
  id: number;

  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;

  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({
    description: 'Roles',
    isArray: true,
    enum: UserRoles,
  })
  roles: UserRoles[];

  @ApiProperty({ description: 'Access token expires in time' })
  expiresIn: string;
}
