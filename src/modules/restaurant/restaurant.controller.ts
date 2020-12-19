import { Controller, Get, Param, Put, Request } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  mapToListResponseDto,
  mapToResponseDto,
} from '@shared/functions';
import { RestaurantResponseDto } from '@modules/restaurant/dto/response/restaurant.response.dto';
import { RestaurantService } from '@modules/restaurant/restaurant.service';
import { ListResponseDto } from '@shared/dto';
import { RestaurantMenuResponseDto } from '@modules/restaurant/dto/response/restaurant-menu.response.dto';
import { TransformIntPipe } from '@shared/pipe/transform-int.pipe';
import { ErrorDto } from '@shared/dto/error.dto';
import { errors } from '@errors/errors';
import { RestaurantCommentsResponseDto } from '@modules/restaurant/dto/response/restaurant-comments.response.dto';
import { Auth } from '@shared/decorators/auth';
import { IUserPayloadParams } from '@modules/auth/interface/IUserPayload';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get self restaurants data' })
  @ApiOkResponse({
    type: RestaurantResponseDto,
    isArray: true,
    description: 'Restaurants list is downloaded',
  })
  async getRestaurant(): Promise<
    ListResponseDto<RestaurantResponseDto>
  > {
    const restaurants = await this.restaurantService.findAll();
    return mapToListResponseDto(RestaurantResponseDto, restaurants);
  }

  @Get(':restaurantId/menu')
  @ApiOperation({ summary: 'Get self restaurant with menu' })
  @ApiOkResponse({
    type: RestaurantMenuResponseDto,
    isArray: true,
    description: 'Restaurant with menu is downloaded',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.RestaurantNotFound.title,
  })
  async getRestaurantMenu(
    @Param('restaurantId', TransformIntPipe) restaurantId: number,
  ): Promise<RestaurantMenuResponseDto> {
    const restaurant = await this.restaurantService.getRestaurantWithMenu(
      restaurantId,
    );
    return mapToResponseDto(RestaurantMenuResponseDto, restaurant);
  }

  @Get(':restaurantId/comments')
  @Auth()
  @ApiOperation({
    summary: 'Get self restaurant with comment',
  })
  @ApiOkResponse({
    type: RestaurantCommentsResponseDto,
    isArray: true,
    description: 'Restaurant with menu is downloaded',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.RestaurantNotFound.title,
  })
  async getRestaurantComments(
    @Param('restaurantId', TransformIntPipe) restaurantId: number,
  ): Promise<RestaurantCommentsResponseDto> {
    const restaurant = await this.restaurantService.getRestaurantWithComments(
      restaurantId,
    );
    return mapToResponseDto(
      RestaurantCommentsResponseDto,
      restaurant,
    );
  }

  @Put(':restaurantId/selected')
  @Auth()
  @ApiOperation({
    summary: 'Put restaurant selected',
  })
  @ApiOkResponse({
    type: Boolean,
    description: 'Restaurant is selected',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.RestaurantNotFound.title,
  })
  async setRestaurantSelected(
    @Param('restaurantId', TransformIntPipe) restaurantId: number,
    @Request() req: { user: IUserPayloadParams },
  ): Promise<boolean> {
    await this.restaurantService.setRestaurantSelected(
      restaurantId,
      req.user.id,
    );
    return true;
  }
}
