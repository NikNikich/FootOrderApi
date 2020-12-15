import { RestaurantResponseDto } from '@modules/restaurant/dto/response/restaurant.response.dto';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseDto } from '@modules/comment/dto/response/comment.response.dto';

export class RestaurantCommentsResponseDto extends RestaurantResponseDto {
  @Expose()
  @Type(() => CommentResponseDto)
  @ApiProperty({
    type: CommentResponseDto,
    description: 'comments restaurant',
    isArray: true,
  })
  comments?: CommentResponseDto[];
}
