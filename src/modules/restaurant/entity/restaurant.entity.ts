import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { RowEntity } from '@modules/database/entity/row.entity';
import { validateOrReject } from 'class-validator';
import { CommentEntity } from '@modules/comment/entity/comment.entity';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';
import { OrderEntity } from '@modules/order/entity/order.entity';

@Entity('restaurant')
export class RestaurantEntity extends RowEntity<RestaurantEntity> {
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', nullable: true, length: 2050 })
  photo?: string;

  @Column({ type: 'varchar', nullable: true, length: 15 })
  phone?: string;

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.restaurant,
  )
  comments?: CommentEntity[];

  @OneToMany(
    () => OrderEntity,
    (order: OrderEntity) => order.restaurant,
  )
  orders?: OrderEntity[];

  @OneToMany(
    () => MenuItemEntity,
    (menuItem: MenuItemEntity) => menuItem.restaurant,
  )
  menuItems?: MenuItemEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
