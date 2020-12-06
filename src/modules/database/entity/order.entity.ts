import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { RowEntity } from '@modules/database/entity/shared/row.entity';
import { UserEntity } from '@modules/database/entity/user.entity';
import { RestaurantEntity } from '@modules/database/entity/restaurant.entity';
import { validateOrReject } from 'class-validator';
import { MenuItemEntity } from '@modules/database/entity/menu-item.entity';
import { OrderStatuses } from '@modules/database/enum/order-status.enum';

@Entity('order')
export class OrderEntity extends RowEntity<OrderEntity> {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'enum', enum: OrderStatuses })
  status!: OrderStatuses;

  @Column({ type: 'numeric' })
  price!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @RelationId((orderUser: OrderEntity) => orderUser.user)
  @Column({ type: 'integer' })
  userId!: number;

  @RelationId(
    (orderRestaurant: OrderEntity) => orderRestaurant.restaurant,
  )
  @Column({ type: 'integer' })
  restaurantId!: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.orders)
  user!: UserEntity;

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant: RestaurantEntity) => restaurant.orders,
  )
  restaurant!: RestaurantEntity;

  @ManyToMany(
    () => MenuItemEntity,
    (menuItem: MenuItemEntity) => menuItem.orders,
  )
  @JoinTable({
    name: 'order_menu-item',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'menu-itemId',
    },
  })
  menuItems?: MenuItemEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
