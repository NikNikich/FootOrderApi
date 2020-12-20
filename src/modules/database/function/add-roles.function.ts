import { IAddRoles } from '@modules/database/interface/add-data.interface';
import { getConnection } from 'typeorm';
import { UserRoleEntity } from '@modules/user-role/entity/user-role.entity';

export const addRoles = async (roles: IAddRoles[]): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(UserRoleEntity)
    .values(roles)
    .execute();
};
