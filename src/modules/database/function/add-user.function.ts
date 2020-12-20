import { IAddUser } from '@modules/database/interface/add-data.interface';
import { UserEntity } from '@modules/user/entity/user.entity';
import { getConnection } from 'typeorm';

export const addUsers = async (
  users: IAddUser[],
): Promise<UserEntity[]> => {
  const saveUsers = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values(users)
    .execute();
  return saveUsers.raw;
};
