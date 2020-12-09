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

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get self profile data' })
  @Auth()
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'User profile is downloaded',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.UserNotFound.title,
  })
  async getProfile(
    @Request() req: IRequest,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(req.user.id);
    const subscriptionInfo = await this.subscriptionService.getAnnualSubscriptionInfo(
      user.id,
    );
    return mapToResponseDto(UserResponseDto, {
      ...this.setAvatarUrl(user),
    });
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update self profile data' })
  @Auth()
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'User data is updated',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.UserNotFound.title,
  })
  async update(
    @Request() req: IRequest,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(req.user.id, data);
    const subscriptionInfo = await this.subscriptionService.getAnnualSubscriptionInfo(
      user.id,
    );
    return mapToResponseDto(UserResponseDto, {
      ...this.setAvatarUrl(user),
      isYearlyMember: subscriptionInfo.status === PaidStatus.PAID,
      currentPeriodEnd: subscriptionInfo.endDate || null,
      isCanceledSubscription: subscriptionInfo.canceled || false,
    });
  }

  private setAvatarUrl(user: UserEntity): UserEntity {
    if (user?.avatar) {
      user.avatar = this.mediaService.getMediaThumbnailUrl(
        user.avatar,
      );
    }
    return user;
  }
}
