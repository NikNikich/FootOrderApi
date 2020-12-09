import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '@modules/user-role/enum/role.enum';
import { Expose, Transform } from 'class-transformer';
import { UserEntity } from '@modules/user/entity/user.entity';

export class LoginResponseDto {
  @Expose()
  @ApiProperty({ description: 'Идентификатор' })
  id: number;

  @Expose()
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @Expose()
  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;

  @Expose()
  @ApiProperty({ description: 'Email' })
  email: string;

  @Expose()
  @ApiProperty({
    enum: UserRoles,
    isArray: true,
    description: 'Role in system',
  })
  @Transform(
    (value, data: UserEntity) =>
      data && data.roles && data.roles.map((item) => item.role),
  )
  roles?: UserRoles[];
}
