import { ConstructableDto } from '@shared/dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AvatarUserResponseDto extends ConstructableDto<AvatarUserResponseDto> {
  @Expose()
  @ApiProperty({ description: 'Avatar user' })
  avatar: string;
}
