import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleRepository } from '@modules/user-role/repository/user-role.repository';
import { UserRoleService } from '@modules/user-role/user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleRepository])],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
