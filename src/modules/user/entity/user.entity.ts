import { validateOrReject } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { UserRoleEntity } from '@modules/user-role/entity/user-role.entity';
import { CommentEntity } from '@modules/comment/entity/comment.entity';
import { AddressEntity } from '@modules/address/entity/address.entity';
import { OrderEntity } from '@modules/order/entity/order.entity';
import { RowEntity } from '@modules/database/entity/row.entity';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';

@Entity('user')
export class UserEntity extends RowEntity<UserEntity> {
  @Column({ type: 'varchar', nullable: true, length: 255 })
  fullName?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', nullable: true, length: 2050 })
  avatar?: string;

  @OneToMany(
    () => UserRoleEntity,
    (role: UserRoleEntity) => role.user,
  )
  roles?: UserRoleEntity[];

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.user,
  )
  comments?: CommentEntity[];

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.user)
  orders?: OrderEntity[];

  @OneToMany(
    () => AddressEntity,
    (address: AddressEntity) => address.user,
  )
  addresses?: AddressEntity[];

  @ManyToMany(
    () => RestaurantEntity,
    (restaurant: RestaurantEntity) => restaurant.selectedUser,
  )
  @JoinTable({
    name: 'selected_restaurant',
    joinColumn: {
      name: 'userId',
    },
    inverseJoinColumn: {
      name: 'restaurantId',
    },
  })
  selectedRestaurants?: RestaurantEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
