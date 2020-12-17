import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { UserEntity } from '@modules/user/entity/user.entity';
import { RowEntity } from '@modules/database/entity/row.entity';
import { OrderEntity } from '@modules/order/entity/order.entity';

@Entity('address')
export class AddressEntity extends RowEntity<AddressEntity> {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'numeric' })
  latitude!: number;

  @Column({ type: 'numeric' })
  longitude!: number;

  @RelationId((addressUser: AddressEntity) => addressUser.user)
  @Column({ type: 'integer', nullable: true })
  userId?: number;

  @Column({ type: 'boolean', default: false })
  isFavorite?: boolean;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.addresses)
  user?: UserEntity;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.address)
  orders?: OrderEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
