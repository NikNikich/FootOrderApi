import { UserRepository } from '@modules/database/repository/user.repository';
import { UserRoleRepository } from '@modules/database/repository/user-role.repository';
import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserRoleRepository]),
    UserRepository,
    UserRoleRepository,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
