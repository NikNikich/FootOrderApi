import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { UserEntity } from '@modules/database/entity/user.entity';
import { RowEntity } from '@modules/database/entity/shared/row.entity';

@Entity('address')
export class AddressEntity extends RowEntity<AddressEntity> {
  @Column({ type: 'varchar' })
  text!: string;

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.addresses)
  users?: UserEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
