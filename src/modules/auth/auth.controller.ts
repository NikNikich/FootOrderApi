import { Body, Controller, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '@modules/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in' })
  @ApiCreatedResponse({
    type: String,
    description: 'Login is successful',
  })
  async signIn(): Promise<string> {
    return 'sign in';
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

  @Post('sign-out')
  @ApiOperation({ summary: 'Sign out of the app' })
  @ApiCreatedResponse({
    type: String,
    description: 'Logout is successful',
  })
  async signOut(): Promise<string> {
    return 'logout';
  }
}
