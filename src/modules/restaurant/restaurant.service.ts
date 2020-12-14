import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@modules/restaurant/repository/restaurant.repository';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';
import { MenuItemService } from '@modules/menu-item/menu-item.service';
import { RestaurantMenuResponseDto } from '@modules/restaurant/dto/response/restaurant-menu.response.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly menuItemService: MenuItemService,
  ) {}

  async findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.find();
  }

  async getRestaurantWithMenu(
    restaurantId: number,
  ): Promise<RestaurantMenuResponseDto> {
    const restaurant = await this.restaurantRepository.findByIdOrReject(
      restaurantId,
    );
    const menu = await this.menuItemService.getRestaurantMenu(
      restaurantId,
    );
    return { ...restaurant, menu };
  }
}
