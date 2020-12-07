import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Request,
  Headers,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '@modules/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginParamsDto, LoginResponseDto } from '@modules/auth/dto';
import { IUserPayloadParams } from '@modules/auth/type/IUserPayload';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginParamsDto })
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in' })
  @ApiCreatedResponse({
    type: LoginResponseDto,
    description: 'Login is successful',
  })
  async signIn(
    @Request() req: { user: IUserPayloadParams },
  ): Promise<LoginResponseDto> {
    return this.authService.signIn(req.user);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up' })
  @ApiCreatedResponse({
    type: String,
    description: 'Sign Up is successful',
  })
  async create(@Body() data: object): Promise<string> {
    return 'signUp';
  }

  @Put('change-password')
  @ApiOperation({ summary: 'change user password' })
  @ApiCreatedResponse({
    type: String,
    description: 'change password',
  })
  async restorePasswordMail(): Promise<string> {
    return 'change_password';
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh auth tokens' })
  @ApiCreatedResponse({
    type: LoginResponseDto,
    description: 'Return new pair access and refresh tokens',
  })
  async refreshToken(
    @Headers('refreshtoken') token: string,
  ): Promise<string> {
    return 'refresh';
  }
}
