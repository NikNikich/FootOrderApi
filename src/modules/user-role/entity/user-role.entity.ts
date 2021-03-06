import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { RowEntity } from '@modules/database/entity/row.entity';
import { UserRoles } from '@modules/user-role/enum/role.enum';
import { UserEntity } from '@modules/user/entity/user.entity';
import { validateOrReject } from 'class-validator';

@Entity('user_role')
export class UserRoleEntity extends RowEntity<UserRoleEntity> {
  @RelationId((userRole: UserRoleEntity) => userRole.user)
  @Column({ type: 'integer', nullable: false })
  userId!: number;

  @Column({ type: 'enum', enum: UserRoles })
  role!: UserRoles;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.roles)
  user?: UserEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
