import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { UserRoles } from '@modules/database/enum/role.enum';
import { UserEntity } from '@modules/database/entity/user.entity';
import { UserRoleEntity } from '@modules/database/entity/user-role.entity';

export class CreateResponseDto {
  @Expose()
  @ApiProperty({ type: Number, description: 'User id' })
  id?: number;

  @Expose()
  @ApiProperty({ description: 'User name' })
  fullName?: string;

  @Expose()
  @ApiProperty({ description: 'Email address' })
  email: string;

  @Expose()
  @ApiProperty({ description: 'Avatar user' })
  avatar?: string;

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
  roles?: UserRoleEntity[];

  @Expose()
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @Expose()
  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;
}
