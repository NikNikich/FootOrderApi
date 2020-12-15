import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CommentEntity } from '@modules/comment/entity/comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends BaseRepository<CommentEntity> {
  async getRestaurantComments(
    restaurantId: number,
  ): Promise<CommentEntity[]> {
    return this.find({
      where: { restaurantId },
      relations: ['user'],
    });
  }
}
