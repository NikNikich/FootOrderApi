import { MigrationInterface } from 'typeorm';
import { head } from 'lodash';
import { UserRoles } from '@modules/user-role/enum/role.enum';
import { hashPassword } from '@shared/functions/hash-password.shared';
import { addUsers } from '@modules/database/function/add-user.function';
import { addRoles } from '@modules/database/function/add-roles.function';

export class AddAdministrator1607971617015
  implements MigrationInterface {
  private readonly adminUser = [
    {
      fullName: 'admin',
      email: 'admin@admin.admin',
      password: hashPassword('admin'),
    },
  ];

  public async up(): Promise<void> {
    const userAdmin = addUsers(this.adminUser);
    const rolesAdmin = [
      {
        userId: head(userAdmin).id,
        role: UserRoles.USER,
      },
      {
        userId: head(userAdmin).id,
        role: UserRoles.ADMIN,
      },
    ];
    await addRoles(rolesAdmin);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
