import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { RowEntity } from '@modules/database/entity/shared/row.entity';
import { validateOrReject } from 'class-validator';
import { RestaurantEntity } from '@modules/database/entity/restaurant.entity';
import { OrderEntity } from '@modules/database/entity/order.entity';

@Entity('menu-item')
export class MenuItemEntity extends RowEntity<MenuItemEntity> {
  @RelationId((menuItem: MenuItemEntity) => menuItem.restaurant)
  @Column({ type: 'integer', nullable: false })
  restaurantId!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ type: 'varchar', nullable: true, length: 2050 })
  photo?: string;

  @Column({ type: 'numeric' })
  price!: number;

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant: RestaurantEntity) => restaurant.menuItems,
  )
  restaurant?: RestaurantEntity;

  @ManyToMany(
    () => OrderEntity,
    (order: OrderEntity) => order.menuItems,
  )
  orders?: OrderEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
