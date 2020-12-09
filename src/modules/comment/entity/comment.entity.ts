import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';
import { RowEntity } from '@modules/database/entity/row.entity';
import { UserEntity } from '@modules/user/entity/user.entity';

@Entity('comment')
export class CommentEntity extends RowEntity<CommentEntity> {
  @Column({ type: 'varchar' })
  text: string;

  @RelationId((userComment: CommentEntity) => userComment.user)
  @Column({ type: 'integer' })
  userId!: number;

  @RelationId(
    (restaurantComment: CommentEntity) =>
      restaurantComment.restaurant,
  )
  @Column({ type: 'integer' })
  restaurantId!: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
  user!: UserEntity;

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant: RestaurantEntity) => restaurant.comments,
  )
  restaurant!: RestaurantEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
