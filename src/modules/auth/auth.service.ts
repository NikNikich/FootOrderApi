import { Injectable } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import {
  IUserCreateParams,
  IUserPayloadParams,
} from '@modules/auth/type/IUserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEntity } from '@modules/user-role/entity/user-role.entity';
import { UserRoles } from '@modules/user-role/enum/role.enum';
import { UserService } from '@modules/user/user.service';
import { LoginResponseDto } from '@modules/auth/dto';
import { CreateResponseDto } from '@modules/auth/dto/response/create-response.dto';
import { isObject, pick } from 'lodash';
import { errors } from '@errors/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly restorePasswordJwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(
    validateEmail: string,
    password: string,
  ): Promise<IUserPayloadParams> {
    const trimEmail = validateEmail.trim().toLowerCase();
    const user = await this.userService.findByEmail(trimEmail);
    if (this.userService.validatePassword(password, user.password)) {
      const { id, email, roles, fullName } = {
        ...user,
        roles: this.mapRoleEntityToList(user.roles),
      };
      return { id, email, roles, fullName };
    }
    return undefined;
  }

  async validateUserById(
    userId: number,
  ): Promise<IUserPayloadParams | undefined> {
    const user = await this.userService.findOne(userId);
    if (user) {
      const { id, email, roles, fullName } = {
        ...user,
        roles: this.mapRoleEntityToList(user.roles),
      };
      return { id, email, roles, fullName };
    }
    return undefined;
  }

  async signIn(user: IUserPayloadParams): Promise<LoginResponseDto> {
    const { id, email, roles } = user;
    const payload = { id, email, roles };
    const { REFRESH_TOKEN_LIFE_TIME } = this.configService.config;
    return {
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: REFRESH_TOKEN_LIFE_TIME,
      }),
      accessToken: this.jwtService.sign(payload),
      id,
      email,
      roles,
    };
  }

  async signUp(user: IUserCreateParams): Promise<CreateResponseDto> {
    const result = await this.userService.create(user);
    const signInData = {
      id: result.id,
      fullName: result.fullName,
      email: result.email,
      roles: result.roles.map(
        (role: UserRoleEntity) => role.role,
      ) || [UserRoles.USER],
    };
    const signIn = await this.signIn(signInData);
    return {
      refreshToken: signIn.refreshToken,
      accessToken: signIn.accessToken,
      ...result,
    };
  }

  refresh(token: string): Promise<LoginResponseDto> {
    try {
      this.jwtService.verify(token);
    } catch (e) {
      throw errors.NotAuthorize;
    }
    const decoded = this.jwtService.decode(token);
    if (isObject(decoded)) {
      return this.signIn(
        pick(decoded, ['id', 'username', 'email', 'roles']),
      );
    }
    throw errors.NotAuthorize;
  }

  private mapRoleEntityToList(
    userRole: UserRoleEntity[],
  ): UserRoles[] {
    return (userRole || []).map((role: UserRoleEntity) => role.role);
  }
}
