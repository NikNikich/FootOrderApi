import { Injectable } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import { IUserPayloadParams } from '@modules/auth/type/IUserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEntity } from '@modules/database/entity/user-role.entity';
import { UserRoles } from '@modules/database/enum/role.enum';
import { UserService } from '@modules/user/user.service';
import { LoginResponseDto } from '@modules/auth/dto';

@Injectable()
export class AuthService {
  private readonly tokenCap = 'Bearer ';

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly restorePasswordJwtService: JwtService,
    private readonly userService: UserService,
  ) {
    const { JWT_RESTORE_SECRET, TOKEN_TIME } = configService.config;
    this.restorePasswordJwtService = new JwtService({
      secret: JWT_RESTORE_SECRET,
      signOptions: { expiresIn: TOKEN_TIME },
    });
  }

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
    const {
      REFRESH_TOKEN_LIFE_TIME,
      TOKEN_TIME,
    } = this.configService.config;
    return {
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: REFRESH_TOKEN_LIFE_TIME,
      }),
      accessToken: this.jwtService.sign(payload),
      id,
      email,
      roles,
      expiresIn: TOKEN_TIME,
    };
  }

  private mapRoleEntityToList(
    userRole: UserRoleEntity[],
  ): UserRoles[] {
    return (userRole || []).map((role: UserRoleEntity) => role.role);
  }
}
