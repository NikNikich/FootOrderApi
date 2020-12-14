import { Controller, Get, Param } from '@nestjs/common';
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

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get self profile data' })
  @ApiOkResponse({
    type: RestaurantResponseDto,
    isArray: true,
    description: 'User profile is downloaded',
  })
  async getRestaurant(): Promise<
    ListResponseDto<RestaurantResponseDto>
  > {
    const restaurants = await this.restaurantService.findAll();
    return mapToListResponseDto(RestaurantResponseDto, restaurants);
  }

  @Get(':restaurantId/menu')
  @ApiOperation({ summary: 'Get self profile data' })
  @ApiOkResponse({
    type: RestaurantResponseDto,
    isArray: true,
    description: 'User profile is downloaded',
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
}
