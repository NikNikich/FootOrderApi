import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@modules/user/dto';

export class CommentResponseDto {
  @Expose()
  @ApiProperty({ description: 'text response' })
  text: string;

  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({
    type: UserResponseDto,
    description: 'Users comment',
  })
  user: UserResponseDto;
}
