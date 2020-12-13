import { UserRepository } from '@modules/user/repository/user.repository';
import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '@modules/address/address.module';
import { UserRoleModule } from '@modules/user-role/user-role.module';
import { ConfigService } from '@modules/config/config.service';
import { ConfigModule } from '@modules/config/config.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '@shared/storage/edite-file-name';
import { imageFileFilter } from '@shared/storage/image-file-filter';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AddressModule,
    UserRoleModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.config.UPLOAD_PATH,
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
