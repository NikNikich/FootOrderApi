import { UserService } from '@modules/user/user.service';
import {
  Body,
  Controller,
  Get,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarUserResponseDto } from '@modules/user/dto/response/avatar-user.response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Put('avatar')
  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update avatar' })
  @ApiCreatedResponse({
    type: AvatarUserResponseDto,
    description: 'User avatar is updated',
  })
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @Request() req: IRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AvatarUserResponseDto> {
    const result = await this.usersService.updateAvatar(
      req.user.id,
      file,
    );
    return mapToResponseDto(AvatarUserResponseDto, result);
  }

  @Get('avatar')
  @ApiOperation({ summary: 'Download Avatar' })
  @Auth()
  @ApiOkResponse({
    type: Buffer,
    description: 'User avatar downloaded',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.NotDownloadAvatarError.title,
  })
  async serveAvatar(@Request() req: IRequest): Promise<Buffer> {
    return this.usersService.downloadAvatar(req.user.id);
  }

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
      ...user,
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
      ...user,
    });
  }
}
