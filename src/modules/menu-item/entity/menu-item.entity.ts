import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { RowEntity } from '@modules/database/entity/row.entity';
import { validateOrReject } from 'class-validator';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';
import { OrderEntity } from '@modules/order/entity/order.entity';

@Entity('menu-item')
export class MenuItemEntity extends RowEntity<MenuItemEntity> {
  @RelationId((menuItem: MenuItemEntity) => menuItem.restaurant)
  @Column({ type: 'integer', nullable: false })
  restaurantId!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ type: 'numeric', nullable: true })
  price?: number;

  @RelationId((item: MenuItemEntity) => item.category)
  @Column({ type: 'integer', nullable: true })
  categoryId?: number;

  @ManyToOne(
    () => MenuItemEntity,
    (menuItemEntity: MenuItemEntity) => menuItemEntity.id,
  )
  category?: MenuItemEntity;

  @OneToMany(
    () => MenuItemEntity,
    (menuItemEntity: MenuItemEntity) => menuItemEntity.category,
  )
  positions?: MenuItemEntity[];

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
