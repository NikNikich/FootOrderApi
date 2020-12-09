import { UserService } from '@modules/user/user.service';
import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { mapToResponseDto } from '@shared/functions';
import { UserEntity } from '@modules/user/entity/user.entity';
import { Auth } from '@shared/decorators/auth';
import { ErrorDto } from '@shared/dto/error.dto';
import { errors } from '@errors/errors';
import { UserProfileResponseDto } from '@modules/user/dto/response/user-profile.response.dto';

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
    const subscriptionInfo = await this.subscriptionService.getAnnualSubscriptionInfo(
      user.id,
    );
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
    @Body() data: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const user = await this.usersService.update(req.user.id, data);
    return mapToResponseDto(UserProfileResponseDto, {
      ...this.usersService.setAvatarUrl(user),
    });
  }
}
