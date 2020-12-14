import { Injectable } from '@nestjs/common';
import { MenuItemResponseDto } from '@modules/menu-item/dto/response/menu-item.response.dto';
import { MenuItemRepository } from '@modules/menu-item/repository/menu-item.repository';

@Injectable()
export class MenuItemService {
  constructor(
    private readonly menuItemRepository: MenuItemRepository,
  ) {}

  async getRestaurantMenu(
    restaurantId: number,
  ): Promise<MenuItemResponseDto[]> {
    const menu = await this.menuItemRepository.getRestaurantMenu(
      restaurantId,
    );
    return Promise.all(
      menu.map((menuCategory) => {
        const { name, positions } = menuCategory;
        return {
          category: name,
          positions,
        };
      }),
    );
  }
}
