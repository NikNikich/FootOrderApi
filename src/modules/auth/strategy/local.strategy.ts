import { errors } from '@errors/errors';
import { IUserPayloadParams } from '@modules/auth/type/IUserPayload';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<IUserPayloadParams> {
    const user = await this.authService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw errors.AccessDenied;
    }
    return user;
  }
}
