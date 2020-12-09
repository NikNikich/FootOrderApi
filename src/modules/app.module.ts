import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { DatabaseModule } from '@modules/database/database.module';
import { ConfigModule } from '@modules/config/config.module';

const envName = process.env.NODE_ENV
  ? `/.env.${process.env.NODE_ENV}`
  : '/.env';

@Module({
  imports: [
    ConfigModule.register(process.cwd() + envName),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  exports: [ConfigModule],
  providers: [ConfigModule],
})
export class AppModule {}
