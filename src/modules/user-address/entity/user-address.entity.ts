import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { UserEntity } from '@modules/user/entity/user.entity';
import { RowEntity } from '@modules/database/entity/row.entity';

@Entity('user_address')
export class UserAddressEntity extends RowEntity<UserAddressEntity> {
  @Column({ type: 'varchar' })
  address!: string;

  @RelationId((addressUser: UserAddressEntity) => addressUser.user)
  @Column({ type: 'integer' })
  userId!: number;

  @Column({ type: 'boolean', default: false })
  isFavorite?: boolean;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.orders)
  user!: UserEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
