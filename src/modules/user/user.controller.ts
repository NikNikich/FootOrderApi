import { UserService } from '@modules/user/user.service';
import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { mapToResponseDto } from '@shared/functions';
import { Auth } from '@shared/decorators/auth';
import { ErrorDto } from '@shared/dto/error.dto';
import { errors } from '@errors/errors';
import { UserProfileResponseDto } from '@modules/user/dto/response/user-profile.response.dto';
import { IRequest } from '@shared/interfaces/IRequest';
import { UserProfileRequestDto } from '@modules/user/dto/request/user-profile.request.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get self profile data' })
  @Auth()
  @ApiOkResponse({
    type: UserProfileResponseDto,
    description: 'User profile is downloaded',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.UserNotFound.title,
  })
  async getProfile(
    @Request() req: IRequest,
  ): Promise<UserProfileResponseDto> {
    const user = await this.usersService.findOne(req.user.id);
    return mapToResponseDto(UserProfileResponseDto, {
      ...this.usersService.setAvatarUrl(user),
    });
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update self profile data' })
  @Auth()
  @ApiOkResponse({
    type: UserProfileResponseDto,
    description: 'User data is updated',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.UserNotFound.title,
  })
  async update(
    @Request() req: IRequest,
    @Body() data: UserProfileRequestDto,
  ): Promise<UserProfileResponseDto> {
    const user = await this.usersService.update(req.user.id, data);
    return mapToResponseDto(UserProfileResponseDto, {
      ...this.usersService.setAvatarUrl(user),
    });
  }
}
