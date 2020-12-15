import { Injectable } from '@nestjs/common';
import { CommentRepository } from '@modules/comment/repository/comment.repository';
import { CommentEntity } from '@modules/comment/entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  async getRestaurantComments(
    restaurantId: number,
  ): Promise<CommentEntity[]> {
    return this.commentRepository.getRestaurantComments(restaurantId);
  }
}
