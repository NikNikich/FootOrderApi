import { Module } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { AuthController } from '@modules/auth/auth.controller';
import { UserService } from '@modules/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule } from '@modules/config/config.module';
import { ConfigService } from '@modules/config/config.service';

@Module({
  controllers: [AuthController],
  imports: [
    UserService,
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => {
        const { JWT_SECRET, TOKEN_TIME } = configService.config;
        return {
          secret: JWT_SECRET,
          signOptions: { expiresIn: TOKEN_TIME || '60m' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
