import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Headers,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '@modules/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponseDto } from '@modules/auth/dto';
import { IUserPayloadParams } from '@modules/auth/type/IUserPayload';
import { CreateResponseDto } from '@modules/auth/dto/response/create-response.dto';
import { UserRoles } from '@modules/user-role/enum/role.enum';
import { mapToResponseDto } from '@shared/functions';
import { LoginAndCreateParamsDto } from '@modules/auth/dto/request/login-and-creat-params.dto';
import { ErrorDto } from '@shared/dto/error.dto';
import { errors } from '@errors/errors';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginAndCreateParamsDto })
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in' })
  @ApiCreatedResponse({
    type: LoginResponseDto,
    description: 'Login is successful',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.AccessDenied.title,
  })
  async signIn(
    @Request() req: { user: IUserPayloadParams },
  ): Promise<LoginResponseDto> {
    const result = await this.authService.signIn(req.user);
    return mapToResponseDto(LoginResponseDto, result);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up' })
  @ApiCreatedResponse({
    type: CreateResponseDto,
    description: 'Sign Up is successful',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.EmailAlreadyUsed.title,
  })
  async create(
    @Body() data: LoginAndCreateParamsDto,
  ): Promise<LoginResponseDto> {
    const result = await this.authService.signUp({
      ...data,
      roles: [UserRoles.USER],
    });
    return mapToResponseDto(LoginResponseDto, result);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh auth tokens' })
  @ApiCreatedResponse({
    type: LoginResponseDto,
    description: 'Return new pair access and refresh tokens',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.AccessDenied.title,
  })
  refreshToken(
    @Headers('refreshtoken') token: string,
  ): Promise<LoginResponseDto> {
    return this.authService.refresh(token);
  }
}
