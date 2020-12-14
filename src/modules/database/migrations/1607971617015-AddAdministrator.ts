import { getConnection, MigrationInterface } from 'typeorm';
import { UserEntity } from '@modules/user/entity/user.entity';
import { head } from 'lodash';
import { UserRoleEntity } from '@modules/user-role/entity/user-role.entity';
import { UserRoles } from '@modules/user-role/enum/role.enum';
import * as bcrypt from 'bcryptjs';

export class AddAdministrator1607971617015
  implements MigrationInterface {
  private readonly adminName = 'admin';

  private readonly adminEmail = 'admin@admin.admin';

  private readonly adminPassword = 'admin';

  public async up(): Promise<void> {
    const userAdmin = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          fullName: this.adminName,
          email: this.adminEmail,
          password: this.hashPassword(this.adminPassword),
        },
      ])
      .execute();
    const userId = head(userAdmin.raw).id;

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(UserRoleEntity)
      .values([
        { userId, role: UserRoles.ADMIN },
        { userId, role: UserRoles.USER },
      ])
      .execute();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
}
