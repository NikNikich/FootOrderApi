import { UserRepository } from '@modules/user/repository/user.repository';
import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '@modules/address/address.module';
import { UserRoleModule } from '@modules/user-role/user-role.module';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AddressModule,
    UserRoleModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
