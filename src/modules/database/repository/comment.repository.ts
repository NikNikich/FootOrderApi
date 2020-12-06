import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CommentEntity } from '@modules/database/entity/comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends BaseRepository<CommentEntity> {}
