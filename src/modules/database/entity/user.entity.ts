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
import { UserRoleEntity } from '@modules/database/entity/user-role.entity';
import { CommentEntity } from '@modules/database/entity/comment.entity';
import { AddressEntity } from '@modules/database/entity/address.entity';
import { OrderEntity } from '@modules/database/entity/order.entity';
import { RowEntity } from '@modules/database/entity/shared/row.entity';

@Entity('user')
export class UserEntity extends RowEntity<UserEntity> {
  @Column({ type: 'varchar', length: 255 })
  fullName!: string;

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
  roles!: UserRoleEntity[];

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.user,
  )
  comments?: CommentEntity[];

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.user)
  orders?: OrderEntity[];

  @ManyToMany(
    () => AddressEntity,
    (address: AddressEntity) => address.users,
  )
  @JoinTable({
    name: 'user_address',
    joinColumn: {
      name: 'userId',
    },
    inverseJoinColumn: {
      name: 'addressId',
    },
  })
  addresses?: AddressEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
