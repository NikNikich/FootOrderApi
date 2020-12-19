import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@modules/restaurant/repository/restaurant.repository';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';
import { MenuItemService } from '@modules/menu-item/menu-item.service';
import { RestaurantMenuResponseDto } from '@modules/restaurant/dto/response/restaurant-menu.response.dto';
import { RestaurantCommentsResponseDto } from '@modules/restaurant/dto/response/restaurant-comments.response.dto';
import { UserRepository } from '@modules/user/repository/user.repository';
import { UserEntity } from '@modules/user/entity/user.entity';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly menuItemService: MenuItemService,
  ) {}

  async findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.find();
  }

  async getRestaurantWithMenu(
    restaurantId: number,
  ): Promise<RestaurantMenuResponseDto> {
    const restaurant = await this.getRestaurant(restaurantId);
    const menu = await this.menuItemService.getRestaurantMenu(
      restaurantId,
    );
    return { ...restaurant, menu };
  }

  async getRestaurantWithComments(
    restaurantId: number,
  ): Promise<RestaurantCommentsResponseDto> {
    return this.restaurantRepository.getByIdWithCommentsOrReject(
      restaurantId,
    );
  }

  async setRestaurantSelected(
    restaurantId: number,
    userId: number,
  ): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepository.getByIdWithSelectedUserOrReject(
      restaurantId,
    );
    if (this.isRestaurantSelected(restaurant.selectedUser, userId)) {
      return restaurant;
    }
    const user = await this.userRepository.findByIdOrReject(userId);
    restaurant.selectedUser.push(user);
    return this.restaurantRepository.save(restaurant);
  }

  async getRestaurant(
    restaurantId: number,
  ): Promise<RestaurantEntity> {
    return this.restaurantRepository.getByIdOrReject(restaurantId);
  }

  private isRestaurantSelected(
    selectedUser: UserEntity[],
    userId: number,
  ): boolean {
    const findUser = selectedUser.find((user) => user.id === userId);
    return !!findUser;
  }
}
